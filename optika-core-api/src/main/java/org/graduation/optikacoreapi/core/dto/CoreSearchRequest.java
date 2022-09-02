package org.graduation.optikacoreapi.core.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.ProductOrderBy;
import org.graduation.data.model.enums.ProductType;

@Data
@NoArgsConstructor
public class CoreSearchRequest {

    //Search by: brand, code
    private String searchKey;

    private ProductType type;

    private ProductOrderBy orderBy;

    private Category category;

    private boolean inStock;

    private boolean hotDeal;

}
