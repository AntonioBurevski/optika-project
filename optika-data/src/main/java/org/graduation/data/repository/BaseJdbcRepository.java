package org.graduation.data.repository;

import com.google.common.collect.Range;
import org.graduation.data.util.Property;
import org.graduation.data.util.WildcardPosition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static org.springframework.util.StringUtils.capitalize;
import static org.springframework.util.StringUtils.isEmpty;

@Component
@NoRepositoryBean
public abstract class BaseJdbcRepository {

    private static final List<String> SUPPORTED_WILDCARDS = newArrayList("%", "_");

    protected NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
    }

    protected  static boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");  //match a number with optional '-' and decimal.
    }

    static <V extends Comparable<? super V>> void appendRangeCriteria(
            String key,
            String tableKey,
            String delimiter,
            Range<V> range,
            Map<String, Object> sqlParams,
            List<String> searchCriteria) {

        StringJoiner criteriaJoiner = new StringJoiner(delimiter, "(", ")");

        criteriaJoiner.setEmptyValue("");

        if (range.hasLowerBound()) {
            String fromKey = "from" + capitalize(key);

            String fromCriteria = String.format("%s.%s >= :%s", tableKey, key.toLowerCase(), fromKey);

            sqlParams.put(fromKey, range.lowerEndpoint());
            criteriaJoiner.add(fromCriteria);
        }

        if (range.hasUpperBound()) {
            String toKey = "to" + capitalize(key);

            String toCriteria = String.format("%s.%s <= :%s", tableKey, key.toLowerCase(), toKey);

            sqlParams.put(toKey, range.upperEndpoint());
            criteriaJoiner.add(toCriteria);
        }

        String criteria = criteriaJoiner.toString();

        if (!isEmpty(criteria)) {
            searchCriteria.add(criteria);
        }
    }

    protected static Map<String, Object> escapeWildcardsAndPrepareParams(Map<String, Object> sqlParams) {

        Map<String, Object> escapedSqlParamsMap = newHashMap();

        for (Map.Entry<String, Object> entry: sqlParams.entrySet()) {

            String key = entry.getKey();
            Object value = entry.getValue();

            if (value instanceof Property) {

                Property property = (Property) value;

                Object searchValue = property.getValue();
                WildcardPosition wildcardPosition = property.getWildcardPosition();

                String escapedValue = "";
                if (searchValue instanceof String) {
                    escapedValue = (String) searchValue;
                    for (String supportedWildcard : SUPPORTED_WILDCARDS) {
                        escapedValue = escapedValue.replace(supportedWildcard, "\\\\" + supportedWildcard);
                    }
                }

                if (!isEmpty(escapedValue)) {
                    searchValue = escapedValue;
                }

                switch (wildcardPosition) {
                    case SUFFIX: {
                        searchValue = searchValue + "%";
                        break;
                    }
                    case PREFIX: {
                        searchValue = "%" + searchValue;
                        break;
                    }
                    case SUFFIX_AND_PREFIX: {
                        searchValue = "%" + searchValue + "%";
                        break;
                    }
                }

                escapedSqlParamsMap.put(key, searchValue);
            } else {
                escapedSqlParamsMap.put(key, value);
            }
        }

        return escapedSqlParamsMap;
    }

}
