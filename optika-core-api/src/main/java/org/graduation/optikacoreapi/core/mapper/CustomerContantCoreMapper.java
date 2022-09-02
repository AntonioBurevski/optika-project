package org.graduation.optikacoreapi.core.mapper;

import org.graduation.data.model.CustomerContact;
import org.graduation.optikacoreapi.core.dto.CustomerContactCoreDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerContantCoreMapper {

    CustomerContact toModel(CustomerContactCoreDto customerContactCoreDto);

    CustomerContactCoreDto toDto(CustomerContact customerContact);

}
