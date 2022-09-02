package org.graduation.optikaadminapi.archive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpsertArchiveDto {

    private Long productId;

    private String productCode;

    private LocalDate archivedDate;

    private LocalTime archivedTime;

    private String remarks;

}
