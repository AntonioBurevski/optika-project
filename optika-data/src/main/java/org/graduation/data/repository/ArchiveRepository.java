package org.graduation.data.repository;

import org.graduation.data.model.Archive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArchiveRepository extends JpaRepository<Archive, Long> {

    Optional<Archive> findById(Long id);

    List<Archive> findAllByProductIdAndDeletedFalse(Long id);

    List<Archive> findAllByProductId(Long id);

    List<Archive> findAllByDeletedTrue();

    List<Archive> findAllByDeletedFalse();

}
