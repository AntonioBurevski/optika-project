package org.graduation.optikacoreapi.core.mapper;

import org.graduation.data.model.HotDeal;
import org.graduation.optikacoreapi.core.dto.HotDealCoreDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HotDealCoreMapper {

    HotDealCoreDto toDto(HotDeal hotDeal);

}
