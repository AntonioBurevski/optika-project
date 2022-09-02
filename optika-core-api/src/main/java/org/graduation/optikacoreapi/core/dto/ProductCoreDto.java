package org.graduation.optikacoreapi.core.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.ProductType;
import org.graduation.data.util.Base64Serializer;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.sql.Blob;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ProductCoreDto {

    private Long id;

    private String code;

    private String brand;

    private BigDecimal price;

    private ProductType type;

    private Category category;

    @JsonSerialize(using = Base64Serializer.class)
    private byte[] image;

    private boolean inStock;

    private String description;

    private boolean polarized;

    private boolean photoGray;

    private boolean hotDeal;

    private BigDecimal newPrice;

    private LocalDate fromDate;

    private LocalDate toDate;

}
