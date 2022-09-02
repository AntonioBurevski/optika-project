package org.graduation.optikaadminapi.hotdeal;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.graduation.data.model.HotDeal;
import org.graduation.data.model.Product;
import org.graduation.data.repository.HotDealRepository;
import org.graduation.data.repository.ProductRepository;
import org.graduation.optikaadminapi.error.ErrorCode;
import org.graduation.optikaadminapi.exception.BadRequestException;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealDto;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealSearchDto;
import org.graduation.optikaadminapi.hotdeal.dto.UpsertHotDealDto;
import org.graduation.optikaadminapi.product.ProductService;
import org.graduation.optikaadminapi.product.dto.ProductDto;
import org.graduation.optikaadminapi.product.dto.ProductSearchDto;
import org.graduation.optikaadminapi.util.SetUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class HotDealService {

    private final HotDealRepository hotDealRepository;
    private final ProductRepository productRepository;
    private final HotDealMapper hotDealMapper;

    private final ProductService productService;

    public List<HotDealDto> searchHotDeal(HotDealSearchDto hotDealSearchDto) {

        boolean active = hotDealSearchDto.isActive();

        return getAllHotDeals(active);
    }

    public List<HotDealDto> getAllHotDeals(boolean active) {

        List<HotDeal> hotDeals;
        if (active) {
            hotDeals = hotDealRepository.findAllByActiveTrueAndDeletedFalse();
        } else {
            hotDeals = hotDealRepository.findAllByDeletedFalse();
        }

        return mapProductCodeToHotDeal(hotDeals);
    }

    public UpsertHotDealDto findHotDealById(Long id) {

        HotDeal hotDeal = getExistingHotDealOrThrowException(id);

        Product product = productRepository.findById(hotDeal.getProductId())
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_FOR_HOT_DEAL.name(), "Unknown product id for given hot deal."));

        UpsertHotDealDto upsertHotDealDto = hotDealMapper.toUpsertDto(hotDeal);

        upsertHotDealDto.setProductCode(product.getCode());

        return upsertHotDealDto;
    }

    public HotDealDto addHotDeal(UpsertHotDealDto upsertHotDealDto) {

        HotDeal hotDeal = hotDealMapper.toModel(upsertHotDealDto);

        if (upsertHotDealDto.getFromDate().isAfter(upsertHotDealDto.getToDate())) {
            throw new BadRequestException(ErrorCode.INVALID_DATES.name(), "Invalid dates");
        }

        Product product = productService.setProductHotDeal(upsertHotDealDto.getProductId(), upsertHotDealDto.isActive());

        hotDeal.setOldPrice(product.getPrice());
        hotDeal.setProductCode(product.getCode());
        hotDeal.setDeleted(false);

        HotDeal savedHotDeal = hotDealRepository.save(hotDeal);

        return hotDealMapper.toDto(savedHotDeal);
    }

    public HotDealDto editHotDeal(Long id, UpsertHotDealDto upsertHotDealDto) {

        HotDeal hotDeal = getExistingHotDealOrThrowException(id);

        if (upsertHotDealDto.getFromDate().isAfter(upsertHotDealDto.getToDate())) {
            throw new BadRequestException(ErrorCode.INVALID_DATES.name(), "Invalid dates");
        }

        hotDealMapper.fillModelFromRequest(upsertHotDealDto, hotDeal);

        productService.setProductHotDeal(upsertHotDealDto.getProductId(), upsertHotDealDto.isActive());

        HotDeal savedHotDeal = hotDealRepository.save(hotDeal);

        return hotDealMapper.toDto(savedHotDeal);
    }

    public Long deleteHotDeal(Long id) {

        HotDeal hotDeal = getExistingHotDealOrThrowException(id);

        Product product = productRepository.findById(hotDeal.getProductId())
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_FOR_HOT_DEAL.name(), "Unknown product id for given hot deal."));

        product.setHotDeal(false);
        hotDeal.setDeleted(true);
        hotDeal.setActive(false);

        hotDealRepository.save(hotDeal);

        return id;
    }

    private List<HotDealDto> mapProductCodeToHotDeal(List<HotDeal> hotDeals) {
        Set<Long> productIds = SetUtils.extract(hotDeals, HotDeal::getProductId);
        List<Product> products = productRepository.findAllByIdIn(productIds);
        Map<Long, Product> productMap = products.stream().collect(Collectors.toMap(Product::getId, product -> product));

        List<HotDealDto> hotDealDtos = new ArrayList<>();

        hotDeals.forEach(hotDeal -> {
            HotDealDto hotDealDto = hotDealMapper.toDto(hotDeal);
            if (productMap.containsKey(hotDeal.getProductId())) {
                Product product = productMap.get(hotDeal.getProductId());
                if (!product.isDeleted()) {
                    hotDealDto.setProductCode(product.getCode());
                } else {
                    hotDealDto.setProductCode(product.getCode() + " (Deleted)");
                }
            }
            hotDealDtos.add(hotDealDto);
        });

        return hotDealDtos;
    }

    private HotDeal getExistingHotDealOrThrowException(Long id) {
        return hotDealRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_HOT_DEAL_ID.name(),
                        String.format("Unknown hot deal [id = %s]", id)));
    }
}
