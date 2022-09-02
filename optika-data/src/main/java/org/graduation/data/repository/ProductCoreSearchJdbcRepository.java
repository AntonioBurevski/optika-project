package org.graduation.data.repository;

import com.google.common.base.Joiner;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.graduation.data.model.datautils.ProductCoreSearchRequest;
import org.graduation.data.model.datautils.ProductCoreSearchResult;
import org.graduation.data.model.enums.CategoryEx;
import org.graduation.data.model.enums.ProductOrderBy;
import org.graduation.data.model.enums.ProductTypeEx;
import org.graduation.data.model.mapper.ProductRowMapper;
import org.graduation.data.util.Property;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;

@Repository
public class ProductCoreSearchJdbcRepository extends BaseJdbcRepository {

    @Transactional(readOnly = true)
    public List<ProductCoreSearchResult> searchProducts(ProductCoreSearchRequest productCoreSearchRequest) {

        Map<String, Object> sqlParams = newHashMap();
        List<String> searchCriteria = newArrayList();

        StringJoiner productSearchCriteria = new StringJoiner(" OR ", "(", ")");

        String searchKey = StringUtils.trim(productCoreSearchRequest.getSearchKey());

        if (StringUtils.isNotBlank(searchKey)) {

            Property searchKeyProp = Property.includes(searchKey);
            sqlParams.put("searchKey", searchKeyProp);

            productSearchCriteria.add("p.code LIKE :searchKey");
            productSearchCriteria.add("p.brand LIKE :searchKey");

            searchCriteria.add(productSearchCriteria.toString());
        }

        if (BooleanUtils.isTrue(productCoreSearchRequest.isInStock())) {
            sqlParams.put("inStock", 1);
            searchCriteria.add("p.instock = :inStock");
        }

        if (BooleanUtils.isTrue(productCoreSearchRequest.isHotDeal())) {
            sqlParams.put("hotDeal", 1);
            searchCriteria.add("p.hotdeal = :hotDeal");
        }

        final ProductTypeEx type = productCoreSearchRequest.getType();
        if (type != null && (!type.equals(ProductTypeEx.ALL))) {
            searchCriteria.add("p.type = :type");
            sqlParams.put("type", type.name());
        }

        final CategoryEx category = productCoreSearchRequest.getCategory();
        if (type != null && (!category.equals(CategoryEx.ALL))) {
            searchCriteria.add("p.category = :category");
            sqlParams.put("category", category.name());
        }

        sqlParams.put("deleted", 0);
        searchCriteria.add("p.deleted = :deleted");

        String orderBy = "p.price DESC";
        if (productCoreSearchRequest.getOrderBy().equals(ProductOrderBy.PRICE_ASCENDING)) {
            orderBy = "p.price ASC";
        }

        Map<String, Object> escapedSqlParams = escapeWildcardsAndPrepareParams(sqlParams);

        String sql = ""
                + " SELECT p.id AS id, p.code AS code, p.brand AS brand, p.price AS price, p.type AS type,"
                + "        p.category AS category, p.image AS image, p.imagename AS imageName, p.instock AS inStock, "
                + "        p.description AS description, p.polarized AS polarized, p.photogray AS photoGray, p.hotdeal AS hotDeal,"
                + "        h.newprice AS newPrice, h.fromdate AS fromDate, h.todate AS toDate"
                + " FROM product p"
                + "   LEFT JOIN hotdeal h ON p.id = h.productid AND h.deleted = 0 AND h.active = 1"
                + " WHERE " + Joiner.on(" AND ").join(searchCriteria)
                + " ORDER BY " + orderBy;

        return jdbcTemplate.query(sql, escapedSqlParams, new ProductRowMapper());
    }

}
