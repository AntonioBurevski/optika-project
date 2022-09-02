package org.graduation.optikaadminapi.util;

import java.util.Collection;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;

import static com.google.common.collect.Sets.newHashSet;
import static java.util.stream.Collectors.toSet;

public class SetUtils {

    public static <V, R> Set<R> transform(Collection<V> values, Function<V, R> transformer) {

        if (values == null || values.isEmpty()) {
            return newHashSet();
        }

        return values
                .stream()
                .map(transformer)
                .collect(toSet());
    }

    public static <V> Set<V> filterBy(Collection<V> values, Predicate<V> predicate) {

        if (values == null || values.isEmpty()) {
            return newHashSet();
        }

        if (predicate == null) {
            return newHashSet(values);
        }

        return values
                .stream()
                .filter(predicate)
                .collect(toSet());
    }

    public static <V, R> Set<R> extract(Collection<V> values, Function<V, R> transformer) {

        if (values == null || values.isEmpty()) {
            return newHashSet();
        }

        return values
                .stream()
                .map(transformer)
                .filter(Objects::nonNull)
                .collect(toSet());
    }

    public static <V> Set<V> extractIds(Collection<? extends HasId<V>> values) {

        if (values == null || values.isEmpty()) {
            return newHashSet();
        }

        return values
                .stream()
                .map(HasId::getId)
                .collect(toSet());
    }

}
