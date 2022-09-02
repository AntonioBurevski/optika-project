package org.graduation.optikaadminapi.product;

import org.graduation.data.model.Product;
import org.graduation.optikaadminapi.product.dto.ProductDto;
import org.graduation.optikaadminapi.product.dto.UpsertProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto toDto(Product product);

    List<ProductDto> toDtoList(List<Product> products);

    Product toModel(UpsertProductDto upsertProductDto);

    void fillModelFromRequest(UpsertProductDto request, @MappingTarget Product product);

    UpsertProductDto toUpsertDto(Product product);

}
