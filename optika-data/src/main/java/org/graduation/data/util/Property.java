package org.graduation.data.util;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Property {

    private final WildcardPosition wildcardPosition;

    private final Object value;

    public static Property startsWith(String query) {
        return Property
                .builder()
                .wildcardPosition(WildcardPosition.SUFFIX)
                .value(query)
                .build();
    }

    public static Property includes(String query) {
        return Property
                .builder()
                .wildcardPosition(WildcardPosition.SUFFIX_AND_PREFIX)
                .value(query)
                .build();
    }

}
