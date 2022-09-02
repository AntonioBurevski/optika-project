package org.graduation.optikaadminapi.hotdeal.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HotDealSearchDto {

    private boolean active;

    private String searchTerm;

}
