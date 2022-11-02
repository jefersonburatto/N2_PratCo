package br.edu.cesusc.pratco.service;

import br.edu.cesusc.pratco.domain.Establishment;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Establishment}.
 */
public interface EstablishmentService {
    /**
     * Save a establishment.
     *
     * @param establishment the entity to save.
     * @return the persisted entity.
     */
    Establishment save(Establishment establishment);

    /**
     * Updates a establishment.
     *
     * @param establishment the entity to update.
     * @return the persisted entity.
     */
    Establishment update(Establishment establishment);

    /**
     * Partially updates a establishment.
     *
     * @param establishment the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Establishment> partialUpdate(Establishment establishment);

    /**
     * Get all the establishments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Establishment> findAll(Pageable pageable);

    /**
     * Get all the establishments with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Establishment> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" establishment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Establishment> findOne(Long id);

    /**
     * Delete the "id" establishment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
