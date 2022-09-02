package org.graduation.optikaadminapi.archive;

import lombok.RequiredArgsConstructor;
import org.graduation.optikaadminapi.archive.dto.ArchiveDto;
import org.graduation.optikaadminapi.archive.dto.UpsertArchiveDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/archives")
public class ArchiveController {

    private final ArchiveService archiveService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<ArchiveDto>> getAllArchives() {

        List<ArchiveDto> archiveDtos = archiveService.getAllArchives();

        return new ResponseEntity<>(archiveDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<ArchiveDto> findArchiveById(
            @PathVariable Long id) {

        ArchiveDto archive = archiveService.findArchiveById(id);

        return new ResponseEntity<>(archive, HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<ArchiveDto> saveToArchive(
            @RequestBody @Valid UpsertArchiveDto upsertArchiveDto) {

        ArchiveDto archiveDto = archiveService.addProductToArchive(upsertArchiveDto);

        return new ResponseEntity<>(archiveDto, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<Long> deleteArchive(@PathVariable Long id) {

        Long deleted = archiveService.deleteArchive(id);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }
}
