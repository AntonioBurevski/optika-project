package org.graduation.optikaadminapi.hotdeal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertHotDealDto {

    private Long productId;

    private String productCode;

    private BigDecimal oldPrice;

    private BigDecimal newPrice;

    private LocalDate fromDate;

    private LocalDate toDate;

    private boolean active;

}
