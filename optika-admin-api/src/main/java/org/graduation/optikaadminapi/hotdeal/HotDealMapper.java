package org.graduation.optikaadminapi.hotdeal;

import org.graduation.data.model.HotDeal;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealDto;
import org.graduation.optikaadminapi.hotdeal.dto.UpsertHotDealDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HotDealMapper {

    HotDealDto toDto(HotDeal hotDeal);

    HotDeal toModel(UpsertHotDealDto upsertHotDealDto);

    void fillModelFromRequest(UpsertHotDealDto request, @MappingTarget HotDeal hotDeal);

    UpsertHotDealDto toUpsertDto(HotDeal hotDeal);

}
