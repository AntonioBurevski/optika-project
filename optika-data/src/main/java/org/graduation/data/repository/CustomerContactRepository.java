package org.graduation.data.repository;

import org.graduation.data.model.CustomerContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerContactRepository extends JpaRepository<CustomerContact, Long> {

    List<CustomerContact> findAllByDeletedFalse();

    List<CustomerContact> findAllByDeletedTrue();

    Optional<CustomerContact> findById(Long id);

}
