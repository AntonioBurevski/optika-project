package org.graduation.optikaadminapi.trash;

import lombok.RequiredArgsConstructor;
import org.graduation.optikaadminapi.archive.dto.ArchiveDto;
import org.graduation.optikaadminapi.customercontact.dto.CustomerContactDto;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealDto;
import org.graduation.optikaadminapi.product.dto.ProductDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/trash")
public class TrashController {

    private final TrashService trashService;

    @GetMapping(path = "/products")
    @ResponseBody
    public ResponseEntity<List<ProductDto>> getProductsTrash() {

        List<ProductDto> productDtos = trashService.getProductsTrash();

        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/hot-deals")
    @ResponseBody
    public ResponseEntity<List<HotDealDto>> getHotDealsTrash() {

        List<HotDealDto> hotDealDtos = trashService.getHotDealsTrash();

        return new ResponseEntity<>(hotDealDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/archive")
    @ResponseBody
    public ResponseEntity<List<ArchiveDto>> getArchiveTrash() {

        List<ArchiveDto> archiveDtos = trashService.getArchiveTrash();

        return new ResponseEntity<>(archiveDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/customer-contact")
    @ResponseBody
    public ResponseEntity<List<CustomerContactDto>> getCustomerContactTrash() {

        List<CustomerContactDto> customerContactTrash = trashService.getCustomerContactTrash();

        return new ResponseEntity<>(customerContactTrash, HttpStatus.OK);
    }

    @DeleteMapping(path = "products/{productId}")
    @ResponseBody
    public ResponseEntity<Long> permanentlyDeleteProduct(@PathVariable Long productId) {

        Long deleted = trashService.permanentlyDeleteProduct(productId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

    @DeleteMapping(path = "hotDeals/{hotDealId}")
    @ResponseBody
    public ResponseEntity<Long> permanentlyDeleteHotDeal(@PathVariable Long hotDealId) {

        Long deleted = trashService.permanentlyDeleteHotDeal(hotDealId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

    @DeleteMapping(path = "archive/{archiveId}")
    @ResponseBody
    public ResponseEntity<Long> permanentlyDeleteArchive(@PathVariable Long archiveId) {

        Long deleted = trashService.permanentlyDeleteArchive(archiveId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

    @DeleteMapping(path = "/customer-contact/{customerContactId}")
    @ResponseBody
    public ResponseEntity<Long> permanentlyDeleteCustomerContact(@PathVariable Long customerContactId) {

        Long deleted = trashService.permanentlyDeleteCustomerContact(customerContactId);

        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

    @PutMapping(path = "products/retrieve/{productId}")
    @ResponseBody
    public ResponseEntity<Long> retrieveProduct(@PathVariable Long productId) {

        Long retrievedProductId = trashService.retrieveProduct(productId);

        return new ResponseEntity<>(retrievedProductId, HttpStatus.OK);
    }

}
