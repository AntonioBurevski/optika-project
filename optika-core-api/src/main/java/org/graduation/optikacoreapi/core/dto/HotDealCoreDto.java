package org.graduation.optikacoreapi.core.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class HotDealCoreDto {

    private Long id;

    private Long productId;

    private String productCode;

    private BigDecimal oldPrice;

    private BigDecimal newPrice;

    private LocalDate fromDate;

    private LocalDate toDate;

}
