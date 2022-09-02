package org.graduation.optikaadminapi.customercontact;

import lombok.RequiredArgsConstructor;
import org.graduation.optikaadminapi.customercontact.dto.CustomerContactDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer-contact")
public class CustomerContactController {

    private final CustomerContactService customerContactService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<CustomerContactDto>> getAllCustomerContact() {

        List<CustomerContactDto> customerContactList = customerContactService.getAllCustomerContacts();

        return new ResponseEntity<>(customerContactList, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<CustomerContactDto> getAllCustomerContact(@PathVariable Long id) {

        CustomerContactDto customerContact = customerContactService.findCustomerContactById(id);

        return new ResponseEntity<>(customerContact, HttpStatus.OK);
    }


    @DeleteMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<Long> deleteArchive(@PathVariable Long id) {

        Long deleted = customerContactService.deleteCustomerContact(id);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }
}
