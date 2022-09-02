package org.graduation.optikaadminapi.hotdeal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class HotDealDto {

    private Long id;

    private Long productId;

    private String productCode;

    private BigDecimal oldPrice;

    private BigDecimal newPrice;

    private LocalDate fromDate;

    private LocalDate toDate;

    private boolean active;

    private boolean deleted;

}
