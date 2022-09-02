package org.graduation.data.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.graduation.data.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findById(Long id);

    List<Product> findAllByIdIn(Collection<Long> id);

    List<Product> findAllByIdInAndDeletedFalse(Collection<Long> id);

    List<Product> findAllByInStockTrueAndDeletedFalseAndHotDealFalse();

    List<Product> findAllByDeletedTrue();

    List<Product> findAllByDeletedFalse();

    List<Product> findAllByInStockTrueAndDeletedFalse();

    List<Product> findByCodeLikeAndDeletedFalse(String code);

    List<Product> findByCodeLikeAndInStockTrueAndDeletedFalse(String code);

    List<Product> findByCode(String code);

}
