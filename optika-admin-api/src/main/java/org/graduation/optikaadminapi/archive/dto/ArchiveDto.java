package org.graduation.optikaadminapi.archive.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ArchiveDto {

    private Long id;

    private Long productId;

    private String productCode;

    private BigDecimal price;

    private LocalDateTime archivedDateTime;

    private String remarks;

    private boolean hotDeal;

    private boolean deleted;

}
