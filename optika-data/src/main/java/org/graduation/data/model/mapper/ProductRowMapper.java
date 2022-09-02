package org.graduation.data.model.mapper;

import org.graduation.data.model.datautils.ProductCoreSearchResult;
import org.graduation.data.model.enums.Category;
import org.graduation.data.model.enums.CategoryEx;
import org.graduation.data.model.enums.ProductType;
import org.graduation.data.model.enums.ProductTypeEx;
import org.springframework.jdbc.core.RowMapper;

import javax.annotation.Nullable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import static java.util.Objects.nonNull;

public class ProductRowMapper implements RowMapper<ProductCoreSearchResult> {

    @Override
    public ProductCoreSearchResult mapRow(ResultSet rs, int rowNum) throws SQLException {

        ProductCoreSearchResult searchResultItem = new ProductCoreSearchResult();

        Date fromDate = rs.getDate("fromDate");
        LocalDate localFromDate = null;
        if (nonNull(fromDate)) {
            localFromDate = toLocalDate(fromDate);
        }

        Date toDate = rs.getDate("toDate");
        LocalDate localToDate = null;
        if (nonNull(toDate)) {
            localToDate = toLocalDate(toDate);
        }

        searchResultItem.setId(rs.getLong("id"));
        searchResultItem.setCode(rs.getString("code"));
        searchResultItem.setBrand(rs.getString("brand"));
        searchResultItem.setPrice(rs.getBigDecimal("price"));
        searchResultItem.setType(ProductTypeEx.valueOf(rs.getString("type")));
        searchResultItem.setCategory(CategoryEx.valueOf(rs.getString("category")));
        searchResultItem.setImage(rs.getBytes("image"));
        searchResultItem.setImageName(rs.getString("imageName"));
        searchResultItem.setInStock(rs.getBoolean("inStock"));
        searchResultItem.setDescription(rs.getString("description"));
        searchResultItem.setPolarized(rs.getBoolean("polarized"));
        searchResultItem.setPhotoGray(rs.getBoolean("photoGray"));
        searchResultItem.setHotDeal(rs.getBoolean("hotDeal"));
        searchResultItem.setNewPrice(rs.getBigDecimal("newPrice"));
        searchResultItem.setFromDate(localFromDate);
        searchResultItem.setToDate(localToDate);

        return searchResultItem;
    }

    private LocalDate toLocalDate(Date date) {
        if (date == null) {
            return null;
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return toLocalDateC(calendar);
    }

    private LocalDate toLocalDateC(@Nullable Calendar calendar) {
        if (calendar == null) {
            return null;
        }
        TimeZone tz = calendar.getTimeZone();
        ZoneId zoneId = (tz == null) ? DEFAULT_ZONE_ID : tz.toZoneId();
        return LocalDateTime.ofInstant(calendar.toInstant(), zoneId).toLocalDate();
    }

    public static final ZoneId DEFAULT_ZONE_ID = ZoneId.of("Europe/Zurich");

}
