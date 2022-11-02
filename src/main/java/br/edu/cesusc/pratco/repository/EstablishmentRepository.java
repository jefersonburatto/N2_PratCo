package br.edu.cesusc.pratco.repository;

import br.edu.cesusc.pratco.domain.Establishment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Establishment entity.
 */
@Repository
public interface EstablishmentRepository extends JpaRepository<Establishment, Long> {
    @Query("select establishment from Establishment establishment where establishment.user.login = ?#{principal.username}")
    List<Establishment> findByUserIsCurrentUser();

    default Optional<Establishment> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Establishment> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Establishment> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct establishment from Establishment establishment left join fetch establishment.user",
        countQuery = "select count(distinct establishment) from Establishment establishment"
    )
    Page<Establishment> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct establishment from Establishment establishment left join fetch establishment.user")
    List<Establishment> findAllWithToOneRelationships();

    @Query("select establishment from Establishment establishment left join fetch establishment.user where establishment.id =:id")
    Optional<Establishment> findOneWithToOneRelationships(@Param("id") Long id);
}
