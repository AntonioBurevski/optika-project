package org.graduation.optikaadminapi.product.dto;

import lombok.Data;

@Data
public class ProductSearchDto {

    public String productSearchTerm;

    private boolean inStock;

}
