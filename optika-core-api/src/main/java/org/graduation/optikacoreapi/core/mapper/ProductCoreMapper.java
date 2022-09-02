package org.graduation.optikacoreapi.core.mapper;

import org.graduation.data.model.Product;
import org.graduation.optikacoreapi.core.dto.ProductCoreDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductCoreMapper {

    ProductCoreDto toDto(Product product);

}
