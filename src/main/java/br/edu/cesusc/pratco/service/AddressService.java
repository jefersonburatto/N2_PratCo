package br.edu.cesusc.pratco.service;

import br.edu.cesusc.pratco.domain.Address;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Address}.
 */
public interface AddressService {
    /**
     * Save a address.
     *
     * @param address the entity to save.
     * @return the persisted entity.
     */
    Address save(Address address);

    /**
     * Updates a address.
     *
     * @param address the entity to update.
     * @return the persisted entity.
     */
    Address update(Address address);

    /**
     * Partially updates a address.
     *
     * @param address the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Address> partialUpdate(Address address);

    /**
     * Get all the addresses.
     *
     * @return the list of entities.
     */
    List<Address> findAll();

    /**
     * Get all the addresses with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Address> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" address.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Address> findOne(Long id);

    /**
     * Delete the "id" address.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
