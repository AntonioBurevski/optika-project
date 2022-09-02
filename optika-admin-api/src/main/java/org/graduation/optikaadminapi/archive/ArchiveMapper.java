package org.graduation.optikaadminapi.archive;

import org.graduation.data.model.Archive;
import org.graduation.optikaadminapi.archive.dto.ArchiveDto;
import org.graduation.optikaadminapi.archive.dto.UpsertArchiveDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArchiveMapper {

    ArchiveDto toDto(Archive archive);

    Archive toModel(UpsertArchiveDto upsertArchiveDto);

    UpsertArchiveDto toUpsertDto(Archive archive);

}
