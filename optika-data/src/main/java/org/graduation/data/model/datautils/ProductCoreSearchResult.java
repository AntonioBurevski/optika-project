package org.graduation.data.model.datautils;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.CategoryEx;
import org.graduation.data.model.enums.ProductType;
import org.graduation.data.model.enums.ProductTypeEx;
import org.graduation.data.util.Base64Serializer;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProductCoreSearchResult {

    private Long id;

    private String code;

    private String brand;

    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ProductTypeEx type;

    @Enumerated(EnumType.STRING)
    private CategoryEx category;

    @JsonSerialize(using = Base64Serializer.class)
    private byte[] image;

    private String imageName;

    private boolean inStock;

    private String description;

    private boolean polarized;

    private boolean photoGray;

    private boolean hotDeal;

    private BigDecimal newPrice;

    private LocalDate fromDate;

    private LocalDate toDate;

}
