package org.graduation.optikacoreapi.core;

import lombok.RequiredArgsConstructor;
import org.graduation.data.model.datautils.ProductCoreSearchRequest;
import org.graduation.data.model.datautils.ProductCoreSearchResult;
import org.graduation.optikacoreapi.core.dto.CustomerContactCoreDto;
import org.graduation.optikacoreapi.core.dto.HotDealCoreDto;
import org.graduation.optikacoreapi.core.dto.ProductCoreDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ClientCoreController {

    private final ClientCoreService clientCoreService;

    @PostMapping(path = "/search")
    @ResponseBody
    public List<ProductCoreSearchResult> searchProducts(
            @RequestBody ProductCoreSearchRequest request) {

        return clientCoreService.searchProducts(request);
    }

    @GetMapping(path = "/products")
    @ResponseBody
    public ResponseEntity<List<ProductCoreDto>> getAllProducts() {

        List<ProductCoreDto> productDtos = clientCoreService.getAllProducts(true);

        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/hot-deals")
    @ResponseBody
    public ResponseEntity<List<ProductCoreDto>> getHotDealsToDisplay() {

        List<ProductCoreDto> productDtos = clientCoreService.getHotDealsToDisplay();

        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/products/{id}")
    @ResponseBody
    public ResponseEntity<ProductCoreDto> findProductById(
            @PathVariable Long id) {

        ProductCoreDto product = clientCoreService.findProductById(id);

        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping(path = "/hot-deals/{id}")
    @ResponseBody
    public ResponseEntity<HotDealCoreDto> findHotDealById(
            @PathVariable Long id) {

        HotDealCoreDto hotDeal = clientCoreService.findHotDealById(id);

        return new ResponseEntity<>(hotDeal, HttpStatus.OK);
    }

    @PostMapping(path = "/save-contact-info")
    @ResponseBody
    public ResponseEntity<CustomerContactCoreDto> saveContactInfo(
            @RequestBody CustomerContactCoreDto customerContactCoreDto) {

        CustomerContactCoreDto contactCoreDto = clientCoreService.saveContactInfo(customerContactCoreDto);

        return new ResponseEntity<>(contactCoreDto, HttpStatus.OK);
    }
}
