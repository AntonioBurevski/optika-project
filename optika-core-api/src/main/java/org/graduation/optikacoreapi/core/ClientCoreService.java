package org.graduation.optikacoreapi.core;

import lombok.RequiredArgsConstructor;
import org.graduation.data.model.CustomerContact;
import org.graduation.data.model.HotDeal;
import org.graduation.data.model.Product;
import org.graduation.data.model.datautils.ProductCoreSearchRequest;
import org.graduation.data.model.datautils.ProductCoreSearchResult;
import org.graduation.data.repository.CustomerContactRepository;
import org.graduation.data.repository.HotDealRepository;
import org.graduation.data.repository.ProductCoreSearchJdbcRepository;
import org.graduation.data.repository.ProductRepository;
import org.graduation.optikacoreapi.core.dto.CustomerContactCoreDto;
import org.graduation.optikacoreapi.core.dto.HotDealCoreDto;
import org.graduation.optikacoreapi.core.dto.ProductCoreDto;
import org.graduation.optikacoreapi.core.error.ErrorCode;
import org.graduation.optikacoreapi.core.error.exception.BadRequestException;
import org.graduation.optikacoreapi.core.mapper.CustomerContantCoreMapper;
import org.graduation.optikacoreapi.core.mapper.HotDealCoreMapper;
import org.graduation.optikacoreapi.core.mapper.ProductCoreMapper;
import org.graduation.optikacoreapi.core.util.SetUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCoreService {

    private final ProductRepository productRepository;
    private final HotDealRepository hotDealRepository;
    private final CustomerContactRepository customerContactRepository;

    private final ProductCoreSearchJdbcRepository productCoreSearchJdbcRepository;

    private final ProductCoreMapper productCoreMapper;
    private final HotDealCoreMapper hotDealCoreMapper;
    private final CustomerContantCoreMapper customerContantCoreMapper;

    //SEARCH
    public List<ProductCoreSearchResult> searchProducts(ProductCoreSearchRequest request) {

        return productCoreSearchJdbcRepository.searchProducts(request);
    }

    //GET ALL
    public List<ProductCoreDto> getAllProducts(boolean inStock) {

        List<Product> products;
        if (inStock) {
            products = productRepository.findAllByInStockTrueAndDeletedFalse();
        } else {
            products = productRepository.findAllByDeletedFalse();
        }

        return findHotDealForProducts(products);
    }

    public List<ProductCoreDto> getHotDealsToDisplay() {

        List<HotDeal> hotDeals = hotDealRepository.findAllByActiveTrueAndDeletedFalse();
        HotDeal hotDeal1 = hotDeals.get(0);
        HotDeal hotDeal2 = hotDeals.get(1);
        HotDeal hotDeal3 = hotDeals.get(hotDeals.size() - 1);

        List<HotDeal> newHotDealList = new ArrayList<>();
        newHotDealList.add(hotDeal1);
        newHotDealList.add(hotDeal2);
        newHotDealList.add(hotDeal3);

        Set<Long> productIds = SetUtils.extract(newHotDealList, HotDeal::getProductId);
        List<Product> products = productRepository.findAllByIdInAndDeletedFalse(productIds);

        List<ProductCoreDto> productDtos = new ArrayList<>();

        products.forEach(product -> {
            ProductCoreDto productDto = productCoreMapper.toDto(product);
            newHotDealList.forEach(hotDeal -> {
                if (hotDeal.getProductId().equals(product.getId())) {
                    productDto.setNewPrice(hotDeal.getNewPrice());
                    productDto.setFromDate(hotDeal.getFromDate());
                    productDto.setToDate(hotDeal.getToDate());
                }
            });
            productDtos.add(productDto);
        });

        return productDtos;
    }


    public ProductCoreDto findProductById(Long id) {

        Product product = getExistingProductOrThrowException(id);
        ProductCoreDto upsertProductDto = productCoreMapper.toDto(product);

        if (product.isHotDeal()) {
            HotDeal hotDeal = hotDealRepository.findByProductIdAndDeletedFalse(product.getId())
                    .orElseThrow(() -> new BadRequestException(
                            ErrorCode.UNKNOWN_HOT_DEAL_FOR_PRODUCT.name(), "Hot deal not found for product"));

            upsertProductDto.setNewPrice(hotDeal.getNewPrice());
            upsertProductDto.setFromDate(hotDeal.getFromDate());
            upsertProductDto.setToDate(hotDeal.getToDate());
        }

        return upsertProductDto;
    }

    public HotDealCoreDto findHotDealById(Long id) {

        HotDeal hotDeal = getExistingHotDealOrThrowException(id);

        Product product = productRepository.findById(hotDeal.getProductId())
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_FOR_HOT_DEAL.name(), "Unknown product id for given hot deal."));

        HotDealCoreDto upsertHotDealDto = hotDealCoreMapper.toDto(hotDeal);

        upsertHotDealDto.setProductCode(product.getCode());

        return upsertHotDealDto;
    }

    //SAVE CUSTOMER CONTACT
    public CustomerContactCoreDto saveContactInfo(CustomerContactCoreDto customerContactCoreDto) {

        CustomerContact customerContact = customerContantCoreMapper.toModel(customerContactCoreDto);

        customerContact.setTimestamp(LocalDateTime.now());
        customerContact.setDeleted(false);

        CustomerContact savedCustomerContact = customerContactRepository.save(customerContact);

        return customerContantCoreMapper.toDto(savedCustomerContact);
    }


    private List<ProductCoreDto> findHotDealForProducts(List<Product> products) {

        List<HotDeal> hotDealList = hotDealRepository.findAllByActiveTrue();

        List<ProductCoreDto> productDtos = new ArrayList<>();

        products.forEach(product -> {
            ProductCoreDto productDto = productCoreMapper.toDto(product);
            if (product.isHotDeal()) {
                hotDealList.forEach(hotDeal -> {
                    if (hotDeal.getProductId().equals(product.getId())) {
                        productDto.setNewPrice(hotDeal.getNewPrice());
                        productDto.setFromDate(hotDeal.getFromDate());
                        productDto.setToDate(hotDeal.getToDate());
                    }
                });
            }
            productDtos.add(productDto);
        });

        return productDtos;
    }

    private Product getExistingProductOrThrowException(Long id) {
        return productRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_ID.name(),
                        String.format("Unknown product [id = %s]", id)));
    }

    private HotDeal getExistingHotDealOrThrowException(Long id) {
        return hotDealRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_HOT_DEAL_ID.name(),
                        String.format("Unknown hot deal [id = %s]", id)));
    }
}
