package org.graduation.optikaadminapi.hotdeal;

import lombok.RequiredArgsConstructor;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealDto;
import org.graduation.optikaadminapi.hotdeal.dto.HotDealSearchDto;
import org.graduation.optikaadminapi.hotdeal.dto.UpsertHotDealDto;
import org.graduation.optikaadminapi.product.dto.ProductDto;
import org.graduation.optikaadminapi.product.dto.ProductSearchDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hot-deals")
public class HotDealController {

    private final HotDealService hotDealService;

    @PostMapping(path = "/search")
    @ResponseBody
    public ResponseEntity<List<HotDealDto>> searchHotDeal(@RequestBody HotDealSearchDto hotDealSearchDto) {

        List<HotDealDto> hotDeal = hotDealService.searchHotDeal(hotDealSearchDto);

        return new ResponseEntity<>(hotDeal, HttpStatus.OK);
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<HotDealDto>> getAllHotDeals() {

        List<HotDealDto> hotDealDtos = hotDealService.getAllHotDeals(true);

        return new ResponseEntity<>(hotDealDtos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<UpsertHotDealDto> findHotDealById(
            @PathVariable Long id) {

        UpsertHotDealDto hotDeal = hotDealService.findHotDealById(id);

        return new ResponseEntity<>(hotDeal, HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<HotDealDto> saveHotDeal(
            @RequestBody @Valid UpsertHotDealDto upsertHotDealDto) {

        HotDealDto hotDealDto = hotDealService.addHotDeal(upsertHotDealDto);

        return new ResponseEntity<>(hotDealDto, HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<HotDealDto> editHotDeal(
            @PathVariable Long id,
            @RequestBody @Valid UpsertHotDealDto upsertHotDealDto) {

        HotDealDto hotDealDto = hotDealService.editHotDeal(id, upsertHotDealDto);

        return new ResponseEntity<>(hotDealDto, HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseBody
    public ResponseEntity<Long> deleteHotDeal(@PathVariable Long id) {

        Long deleted = hotDealService.deleteHotDeal(id);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

}
