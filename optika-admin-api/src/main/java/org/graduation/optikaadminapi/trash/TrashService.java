package org.graduation.optikaadminapi.trash;

import lombok.RequiredArgsConstructor;
import org.graduation.data.model.Archive;
import org.graduation.data.model.CustomerContact;
import org.graduation.data.model.HotDeal;
import org.graduation.data.model.Product;
import org.graduation.data.repository.ArchiveRepository;
import org.graduation.data.repository.CustomerContactRepository;
import org.graduation.data.repository.HotDealRepository;
import org.graduation.data.repository.ProductRepository;
import org.graduation.optikaadminapi.archive.ArchiveMapper;
import org.graduation.optikaadminapi.archive.dto.ArchiveDto;
import org.graduation.optikaadminapi.customercontact.CustomerContactMapper;
import org.graduation.optikaadminapi.customercontact.dto.CustomerContactDto;
import org.graduation.optikaadminapi.error.ErrorCode;
import org.graduation.optikaadminapi.exception.BadRequestException;
import org.graduation.optikaadminapi.hotdeal.HotDealMapper;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealDto;
import org.graduation.optikaadminapi.product.ProductMapper;
import org.graduation.optikaadminapi.product.dto.ProductDto;
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
public class TrashService {

    private final ProductRepository productRepository;
    private final HotDealRepository hotDealRepository;
    private final ArchiveRepository archiveRepository;
    private final CustomerContactRepository customerContactRepository;

    private final ProductMapper productMapper;
    private final HotDealMapper hotDealMapper;
    private final ArchiveMapper archiveMapper;
    private final CustomerContactMapper customerContactMapper;

    public List<ProductDto> getProductsTrash() {
        List<Product> products = productRepository.findAllByDeletedTrue();
        return productMapper.toDtoList(products);
    }

    public List<HotDealDto> getHotDealsTrash() {
        List<HotDeal> hotDeals = hotDealRepository.findAllByDeletedTrue();

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

    public List<ArchiveDto> getArchiveTrash() {
        List<Archive> archiveList = archiveRepository.findAllByDeletedTrue();

        Set<Long> productIds = SetUtils.extract(archiveList, Archive::getProductId);
        List<Product> products = productRepository.findAllByIdIn(productIds);
        Map<Long, Product> productMap = products.stream().collect(Collectors.toMap(Product::getId, product -> product));

        List<ArchiveDto> archiveDtos = new ArrayList<>();

        archiveList.forEach(archive -> {
            ArchiveDto archiveDto = archiveMapper.toDto(archive);
            if (productMap.containsKey(archive.getProductId())) {
                Product product = productMap.get(archive.getProductId());
                if (!product.isDeleted()) {
                    archiveDto.setProductCode(product.getCode());
                } else {
                    archiveDto.setProductCode(product.getCode() + " (Deleted)");
                }
            }
            archiveDtos.add(archiveDto);
        });

        return archiveDtos;
    }

    public List<CustomerContactDto> getCustomerContactTrash() {
        List<CustomerContact> customerContacts = customerContactRepository.findAllByDeletedTrue();
        return customerContactMapper.toDtoList(customerContacts);
    }

    public Long permanentlyDeleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_ID.name(),
                        String.format("Unknown product [productId = %s]", productId)));

        List<HotDeal> productHotDeals = hotDealRepository.findAllByProductId(productId);
        List<Archive> productArchives = archiveRepository.findAllByProductId(productId);

        hotDealRepository.delete(productHotDeals);
        archiveRepository.delete(productArchives);
        productRepository.delete(product);

        return productId;
    }

    public Long permanentlyDeleteHotDeal(Long hotDealId) {
        HotDeal hotDeal = hotDealRepository.findById(hotDealId)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_HOT_DEAL_ID.name(),
                        String.format("Unknown hot deal [hotDealId = %s]", hotDealId)));

        hotDealRepository.delete(hotDeal);

        return hotDealId;
    }

    public Long permanentlyDeleteArchive(Long archiveId) {
        Archive archive = archiveRepository.findById(archiveId)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_ARCHIVE_ID.name(),
                        String.format("Unknown archive [archiveId = %s]", archiveId)));

        archiveRepository.delete(archive);

        return archiveId;
    }

    public Long permanentlyDeleteCustomerContact(Long customerContactId) {
        CustomerContact customerContact = customerContactRepository.findById(customerContactId)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_CUSTOMER_CONTACT_ID.name(),
                        String.format("Unknown customer contact [customerContactId = %s]", customerContactId)));

        customerContactRepository.delete(customerContact);

        return customerContactId;
    }

    public Long retrieveProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_ID.name(),
                        String.format("Unknown product [productId = %s]", productId)));

        product.setInStock(true);
        product.setDeleted(false);

        return productId;
    }
}
