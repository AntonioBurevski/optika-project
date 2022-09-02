package org.graduation.data.repository;

import org.graduation.data.model.HotDeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotDealRepository extends JpaRepository<HotDeal, Long> {

    Optional<HotDeal> findById(Long id);

    Optional<HotDeal> findByProductIdAndDeletedFalse(Long id);

    Optional<HotDeal> findByProductId(Long id);

    List<HotDeal> findAllByProductId(Long id);

    List<HotDeal> findAllByActiveTrue();

    List<HotDeal> findAllByDeletedTrue();

    List<HotDeal> findAllByDeletedFalse();

    List<HotDeal> findAllByActiveTrueAndDeletedFalse();

}
