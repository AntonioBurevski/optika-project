package org.graduation.optikaadminapi.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.ProductType;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.sql.Blob;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertProductDto {

    private String code;

    private String brand;

    private BigDecimal price;

    private ProductType type;

    private Category category;

    private MultipartFile file;

    private String imageName;

    private boolean inStock;

    private String description;

    private boolean polarized;

    private boolean photoGray;

    private boolean hotDeal;

    private BigDecimal hotDealPrice;

}
