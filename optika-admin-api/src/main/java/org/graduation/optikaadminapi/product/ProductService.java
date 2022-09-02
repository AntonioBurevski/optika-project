package org.graduation.optikaadminapi.product;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.graduation.data.model.HotDeal;
import org.graduation.data.model.Product;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.ProductType;
import org.graduation.data.repository.HotDealRepository;
import org.graduation.data.repository.ProductRepository;
import org.graduation.optikaadminapi.error.ErrorCode;
import org.graduation.optikaadminapi.exception.BadRequestException;
import org.graduation.optikaadminapi.product.dto.ProductDto;
import org.graduation.optikaadminapi.product.dto.ProductSearchDto;
import org.graduation.optikaadminapi.product.dto.UpsertProductDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.nonNull;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final HotDealRepository hotDealRepository;

    private final ProductMapper productMapper;

    public List<ProductDto> searchProduct(ProductSearchDto productSearchDto) {

        boolean inStock = productSearchDto.isInStock();

        String query = productSearchDto.getProductSearchTerm();
        boolean hasQuery = StringUtils.isNotBlank(query);

        List<Product> products;
        if (!hasQuery) {
            return getAllProducts(inStock);
        } else if (inStock) {
            products = productRepository.findByCodeLikeAndInStockTrueAndDeletedFalse(query + "%");
        } else {
            products = productRepository.findByCodeLikeAndDeletedFalse(query + "%");
        }

        return findHotDealForProducts(products);
    }

    //GET ALL
    public List<ProductDto> getAllProducts(boolean inStock) {

        List<Product> products;
        if (inStock) {
            products = productRepository.findAllByInStockTrueAndDeletedFalse();
        } else {
            products = productRepository.findAllByDeletedFalse();
        }

        return findHotDealForProducts(products);
    }

    public List<ProductDto> getProductsForHotDeals() {
        List<Product> products = productRepository.findAllByInStockTrueAndDeletedFalseAndHotDealFalse();
        return productMapper.toDtoList(products);
    }

    //FIND BY ID
    public ProductDto findProductById(Long id) {

        Product product = getExistingProductOrThrowException(id);
        ProductDto productDto = productMapper.toDto(product);

        if (product.getImage() != null && product.getImageName() != null) {
            productDto.setImageName(product.getImageName());
        }

        if (product.isHotDeal()) {
            HotDeal hotDeal = hotDealRepository.findByProductIdAndDeletedFalse(product.getId())
                    .orElseThrow(() -> new BadRequestException(
                            ErrorCode.UNKNOWN_HOT_DEAL_FOR_PRODUCT.name(), "Hot deal not found for product"));

            productDto.setHotDealPrice(hotDeal.getNewPrice());
        }

        return productDto;
    }

    public UpsertProductDto getProductById(Long id) {

        Product product = getExistingProductOrThrowException(id);
        UpsertProductDto upsertProductDto = productMapper.toUpsertDto(product);

        if (product.getImage() != null && product.getImageName() != null) {
            upsertProductDto.setImageName(product.getImageName());
        }

        if (product.isHotDeal()) {
            HotDeal hotDeal = hotDealRepository.findByProductIdAndDeletedFalse(product.getId())
                    .orElseThrow(() -> new BadRequestException(
                            ErrorCode.UNKNOWN_HOT_DEAL_FOR_PRODUCT.name(), "Hot deal not found for product"));

            upsertProductDto.setHotDealPrice(hotDeal.getNewPrice());
        }

        return upsertProductDto;
    }

    //ADD NEW
    public ProductDto addProduct(UpsertProductDto upsertProductDto) {
        String codeRequest = upsertProductDto.getCode();
        if (productRepository.findByCode(codeRequest).size() > 0) {
            throw new BadRequestException(
                    ErrorCode.DUPLICATE_CODE.name(), "Code already exists");
        }

        MultipartFile file = upsertProductDto.getFile();
        byte[] bytes;
        String imageName;
        try {
            bytes = file.getBytes();
            imageName = file.getOriginalFilename();
        } catch (IOException e) {
            throw new BadRequestException(
                    ErrorCode.INVALID_FILE.name(), "Invalid file");
        }

        Product product = productMapper.toModel(upsertProductDto);

        ProductType productType = product.getType();
        if (productType != ProductType.FRAMES && productType != ProductType.SUNGLASSES) {
            product.setPhotoGray(false);
            product.setPolarized(false);
            product.setCategory(Category.UNISEX);
        }

        product.setImage(bytes);
        product.setImageName(imageName);
        product.setDeleted(false);

        Product savedProduct = productRepository.save(product);

        return productMapper.toDto(savedProduct);
    }

    //EDIT
    public ProductDto editProduct(Long id, UpsertProductDto upsertProductDto) {

        Product product = getExistingProductOrThrowException(id);

        byte[] currentImage = product.getImage();

        MultipartFile file = upsertProductDto.getFile();
        byte[] bytes = null;
        String imageName = "";
        if (nonNull(file)) {
            try {
                bytes = file.getBytes();
                imageName = file.getOriginalFilename();
            } catch (IOException e) {
                throw new BadRequestException(
                        ErrorCode.INVALID_FILE.name(), "Invalid file");
            }
        }

        productMapper.fillModelFromRequest(upsertProductDto, product);

        ProductType productType = product.getType();
        if (productType != ProductType.FRAMES && productType != ProductType.SUNGLASSES) {
            product.setPhotoGray(false);
            product.setPolarized(false);
            product.setCategory(Category.UNISEX);
        }

        if (nonNull(bytes) && !Arrays.equals(currentImage, bytes)) {
            product.setImage(bytes);
            product.setImageName(imageName);
        }

        Product savedProduct = productRepository.save(product);

        if (product.isHotDeal()) {
            updateHotDealFromProduct(product);
        }

        return productMapper.toDto(savedProduct);
    }

    //DELETE
    public Long deleteProduct(Long id) {

        Product product = getExistingProductOrThrowException(id);

        if (product.isHotDeal()) {
            HotDeal hotDeal = hotDealRepository.findByProductId(product.getId())
                    .orElseThrow(() -> new BadRequestException(
                            ErrorCode.UNKNOWN_HOT_DEAL_FOR_PRODUCT.name(), "Unknown hot deal for given product"));

            product.setHotDeal(false);
            product.setInStock(false);
            hotDeal.setActive(false);
            hotDeal.setDeleted(true);
            hotDealRepository.save(hotDeal);
        }

        product.setDeleted(true);

        productRepository.save(product);

        return id;
    }

    private List<ProductDto> findHotDealForProducts(List<Product> products) {

        List<HotDeal> hotDealList = hotDealRepository.findAllByActiveTrue();

        List<ProductDto> productDtos = new ArrayList<>();

        products.forEach(product -> {
            ProductDto productDto = productMapper.toDto(product);
            if (product.isHotDeal()) {
                hotDealList.forEach(hotDeal -> {
                    if (hotDeal.getProductId().equals(product.getId())) {
                        productDto.setHotDealPrice(hotDeal.getNewPrice());
                    }
                });
            }
            productDtos.add(productDto);
        });

        return productDtos;
    }

    public Product setProductHotDeal(Long productId, boolean isActive) {
        Product product = getExistingProductOrThrowException(productId);
        product.setHotDeal(isActive);
        productRepository.save(product);

        return product;
    }

    public void updateHotDealFromProduct(Product product) {
        HotDeal hotDeal = hotDealRepository.findByProductIdAndDeletedFalse(product.getId())
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_HOT_DEAL_FOR_PRODUCT.name(), "Hot deal not found for product"));
        hotDeal.setActive(product.isInStock());
    }

    private Product getExistingProductOrThrowException(Long id) {
        return productRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_ID.name(),
                        String.format("Unknown product [id = %s]", id)));
    }
}
