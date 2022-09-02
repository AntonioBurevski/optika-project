package org.graduation.optikaadminapi.customercontact;

import org.graduation.data.model.CustomerContact;
import org.graduation.optikaadminapi.customercontact.dto.CustomerContactDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerContactMapper {

    CustomerContactDto toDto(CustomerContact customerContact);

    List<CustomerContactDto> toDtoList(List<CustomerContact> customerContactList);

}
