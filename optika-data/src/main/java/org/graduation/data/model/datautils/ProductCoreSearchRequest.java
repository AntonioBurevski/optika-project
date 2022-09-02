package org.graduation.data.model.datautils;

import lombok.Data;
import org.graduation.data.ApiModel;
import org.graduation.data.model.enums.CategoryEx;
import org.graduation.data.model.enums.ProductOrderBy;
import org.graduation.data.model.enums.ProductTypeEx;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@ApiModel
@Data
public class ProductCoreSearchRequest {

    //Search by: brand, code
    private String searchKey;

    @Enumerated(EnumType.STRING)
    private ProductTypeEx type;

    private ProductOrderBy orderBy;

    @Enumerated(EnumType.STRING)
    private CategoryEx category;

    private boolean inStock;

    private boolean hotDeal;

}
