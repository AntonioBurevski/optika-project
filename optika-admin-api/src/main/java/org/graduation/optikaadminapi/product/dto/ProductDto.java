package org.graduation.optikaadminapi.product.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.ProductType;
import lombok.*;
import org.graduation.data.util.Base64Serializer;

import java.math.BigDecimal;
import java.sql.Blob;

@Data
@NoArgsConstructor
public class ProductDto {

    private Long id;

    private String code;

    private String brand;

    private BigDecimal price;

    private ProductType type;

    private Category category;

    @JsonSerialize(using = Base64Serializer.class)
    private byte[] image;

    private String imageName;

    private boolean inStock;

    private String description;

    private boolean polarized;

    private boolean photoGray;

    private boolean hotDeal;

    private BigDecimal hotDealPrice;

    private boolean deleted;

}
