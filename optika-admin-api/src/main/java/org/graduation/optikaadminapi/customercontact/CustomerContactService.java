package org.graduation.optikaadminapi.customercontact;

import lombok.RequiredArgsConstructor;
import org.graduation.data.model.Archive;
import org.graduation.data.model.CustomerContact;
import org.graduation.data.model.Product;
import org.graduation.data.repository.CustomerContactRepository;
import org.graduation.optikaadminapi.archive.dto.ArchiveDto;
import org.graduation.optikaadminapi.customercontact.dto.CustomerContactDto;
import org.graduation.optikaadminapi.error.ErrorCode;
import org.graduation.optikaadminapi.exception.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerContactService {

    private final CustomerContactRepository customerContactRepository;
    private final CustomerContactMapper customerContactMapper;


    public List<CustomerContactDto> getAllCustomerContacts() {
        List<CustomerContact> customerContacts = customerContactRepository.findAllByDeletedFalse();
        return customerContactMapper.toDtoList(customerContacts);
    }

    public CustomerContactDto findCustomerContactById(Long id) {

        CustomerContact customerContact = getExistingCustomerContactOrThrowException(id);

        return customerContactMapper.toDto(customerContact);
    }

    public Long deleteCustomerContact(Long id) {

        CustomerContact customerContact = getExistingCustomerContactOrThrowException(id);

        customerContact.setDeleted(true);

        customerContactRepository.save(customerContact);

        return id;
    }

    private CustomerContact getExistingCustomerContactOrThrowException(Long id) {
        return customerContactRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_CUSTOMER_CONTACT_ID.name(),
                        String.format("Unknown customer contact [id = %s]", id)));
    }
}
