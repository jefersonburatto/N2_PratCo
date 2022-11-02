package br.edu.cesusc.pratco.service;

import br.edu.cesusc.pratco.domain.Food;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Food}.
 */
public interface FoodService {
    /**
     * Save a food.
     *
     * @param food the entity to save.
     * @return the persisted entity.
     */
    Food save(Food food);

    /**
     * Updates a food.
     *
     * @param food the entity to update.
     * @return the persisted entity.
     */
    Food update(Food food);

    /**
     * Partially updates a food.
     *
     * @param food the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Food> partialUpdate(Food food);

    /**
     * Get all the foods.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Food> findAll(Pageable pageable);

    /**
     * Get all the foods with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Food> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" food.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Food> findOne(Long id);

    /**
     * Delete the "id" food.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
