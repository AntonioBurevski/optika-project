package org.graduation.optikacoreapi.core.util;

import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.BinaryOperator;
import java.util.function.Function;

import static com.google.common.collect.Maps.newHashMap;
import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

public class MapUtils {

    public static <K, V> Map<K, V> keyBy(Collection<V> values, Function<V, K> keyGenerator) {

        if (values == null || values.isEmpty()) {
            return new HashMap<>();
        }

        Map<K, V> map = values.stream().collect(toMap(keyGenerator, item -> item));

        return map;
    }

    public static <K, V> Map<K, V> keyByAllowingDuplicates(
            Collection<V> values, Function<V, K> keyGenerator) {

        if (values == null || values.isEmpty()) {
            return new HashMap<>();
        }

        Map<K, V> map = values.stream().collect(toMap(keyGenerator, item -> item, (s, a) -> {
            return s;
        }));

        return map;
    }

    public static <K, V> Map<K, V> linkedKeyBy(Collection<V> values, Function<V, K> keyGenerator) {

        if (values == null || values.isEmpty()) {
            return new HashMap<>();
        }

        Map<K, V> map = values.stream().collect(toMap(keyGenerator, item -> item, throwingMerger(), LinkedHashMap::new));

        return map;
    }

    private static <T> BinaryOperator<T> throwingMerger() {
        return (u,v) -> { throw new IllegalStateException(String.format("Duplicate key %s", u)); };
    }

    public static <K, V> Map<K, V> keyBy(Collection<V> values,
                                         Function<V, K> keyGenerator,
                                         BinaryOperator<V> mergeFunction) {

        if (values == null || values.isEmpty()) {
            return newHashMap();
        }

        return values
                .stream()
                .collect(toMap(keyGenerator, identity(), mergeFunction));
    }

    public static <K, V extends HasId<K>> Map<K, V> keyById(Collection<V> values) {

        if (values == null || values.isEmpty()) {
            return new HashMap<>();
        }

        Map<K, V> map = values.stream().collect(toMap(HasId::getId, identity()));
        return map;
    }

}
