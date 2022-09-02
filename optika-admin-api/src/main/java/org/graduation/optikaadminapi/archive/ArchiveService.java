package org.graduation.optikaadminapi.archive;

import lombok.RequiredArgsConstructor;
import org.graduation.data.model.Archive;
import org.graduation.data.model.HotDeal;
import org.graduation.data.model.Product;
import org.graduation.data.repository.ArchiveRepository;
import org.graduation.data.repository.HotDealRepository;
import org.graduation.data.repository.ProductRepository;
import org.graduation.optikaadminapi.archive.dto.ArchiveDto;
import org.graduation.optikaadminapi.archive.dto.UpsertArchiveDto;
import org.graduation.optikaadminapi.error.ErrorCode;
import org.graduation.optikaadminapi.exception.BadRequestException;
import org.graduation.optikaadminapi.util.SetUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ArchiveService {

    private final ArchiveRepository archiveRepository;
    private final ProductRepository productRepository;
    private final HotDealRepository hotDealRepository;
    private final ArchiveMapper archiveMapper;

    public List<ArchiveDto> getAllArchives() {
        List<Archive> archiveList = archiveRepository.findAllByDeletedFalse();

        Set<Long> productIds = SetUtils.extract(archiveList, Archive::getProductId);
        List<Product> products = productRepository.findAllByIdIn(productIds);
        Map<Long, Product> productMap = products.stream().collect(Collectors.toMap(Product::getId, product -> product));

        List<ArchiveDto> archiveDtos = new ArrayList<>();

        archiveList.forEach(archive -> {
            ArchiveDto archiveDto = archiveMapper.toDto(archive);
            if (productMap.containsKey(archive.getProductId())) {
                Product product = productMap.get(archive.getProductId());
                if (!product.isDeleted()) {
                    archiveDto.setProductCode(product.getCode());
                } else {
                    archiveDto.setProductCode(product.getCode() + " (Deleted)");
                }
            }
            archiveDtos.add(archiveDto);
        });

        return archiveDtos;
    }

    public ArchiveDto findArchiveById(Long id) {

        Archive archive = getExistingArchiveOrThrowException(id);

        Product product = productRepository.findById(archive.getProductId())
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_FOR_HOT_DEAL.name(), "Unknown product id for given hot deal."));

        ArchiveDto archiveDto = archiveMapper.toDto(archive);

        archiveDto.setProductCode(product.getCode());

        return archiveDto;
    }

    public ArchiveDto addProductToArchive(UpsertArchiveDto upsertArchiveDto) {

        Archive archive = archiveMapper.toModel(upsertArchiveDto);

        Product product = productRepository.findById(upsertArchiveDto.getProductId())
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_PRODUCT_ID.name(), "Unknown product id"));

        if (product.isHotDeal()) {
            HotDeal hotDeal = hotDealRepository.findByProductIdAndDeletedFalse(product.getId())
                    .orElseThrow(() -> new BadRequestException(
                            ErrorCode.UNKNOWN_HOT_DEAL_FOR_PRODUCT.name(), "Unknown hot deal for product id"));
            archive.setHotDeal(product.isHotDeal());
            archive.setPrice(hotDeal.getNewPrice());
        } else {
            archive.setHotDeal(product.isHotDeal());
            archive.setPrice(product.getPrice());
        }

        LocalDate date = upsertArchiveDto.getArchivedDate();
        LocalTime time = upsertArchiveDto.getArchivedTime();

        int hour = time.getHour();
        int minutes = time.getMinute();
        LocalDateTime archivedDateTime = date.atTime(hour, minutes);

        archive.setArchivedDateTime(archivedDateTime);
        archive.setProductCode(product.getCode());

        archive.setDeleted(false);

        Archive savedArchive = archiveRepository.save(archive);

        return archiveMapper.toDto(savedArchive);
    }

    public Long deleteArchive(Long id) {

        Archive archive = getExistingArchiveOrThrowException(id);

        archive.setDeleted(true);

        archiveRepository.save(archive);

        return id;
    }

    private Archive getExistingArchiveOrThrowException(Long id) {
        return archiveRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(
                        ErrorCode.UNKNOWN_ARCHIVE_ID.name(),
                        String.format("Unknown archive [id = %s]", id)));
    }
}
