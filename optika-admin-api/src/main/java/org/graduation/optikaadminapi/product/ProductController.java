package org.graduation.optikaadminapi.product;

import lombok.RequiredArgsConstructor;
import org.graduation.optikaadminapi.product.dto.ProductDto;
import org.graduation.optikaadminapi.product.dto.ProductSearchDto;
import org.graduation.optikaadminapi.product.dto.UpsertProductDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping(path = "/search")
    @ResponseBody
    public ResponseEntity<List<ProductDto>> searchProduct(@RequestBody ProductSearchDto productSearchDto) {

        List<ProductDto> product = productService.searchProduct(productSearchDto);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping(path = "/products/hot-deal")
    @ResponseBody
    public ResponseEntity<List<ProductDto>> getProductsForHotDeals() {

        List<ProductDto> productDtos = productService.getProductsForHotDeals();

        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<ProductDto>> getAllProducts() {

        List<ProductDto> productDtos = productService.getAllProducts(true);

        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<ProductDto> findProductById(
            @PathVariable Long id) {

        ProductDto product = productService.findProductById(id);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping(path = "/get/{id}")
    @ResponseBody
    public ResponseEntity<UpsertProductDto> getProductById(
            @PathVariable Long id) {

        UpsertProductDto product = productService.getProductById(id);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<ProductDto> saveProduct(
            @ModelAttribute UpsertProductDto upsertProductDto) {

        ProductDto productDto = productService.addProduct(upsertProductDto);

        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<ProductDto> editProduct(
            @PathVariable Long id,
            @ModelAttribute UpsertProductDto upsertProductDto) {

        ProductDto productDto = productService.editProduct(id, upsertProductDto);

        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<Long> deleteProduct(@PathVariable Long id) {

        Long deleted = productService.deleteProduct(id);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }
}
