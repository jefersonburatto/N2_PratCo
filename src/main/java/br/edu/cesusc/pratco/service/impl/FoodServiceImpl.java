package br.edu.cesusc.pratco.service.impl;

import br.edu.cesusc.pratco.domain.Food;
import br.edu.cesusc.pratco.repository.FoodRepository;
import br.edu.cesusc.pratco.service.FoodService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Food}.
 */
@Service
@Transactional
public class FoodServiceImpl implements FoodService {

    private final Logger log = LoggerFactory.getLogger(FoodServiceImpl.class);

    private final FoodRepository foodRepository;

    public FoodServiceImpl(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public Food save(Food food) {
        log.debug("Request to save Food : {}", food);
        return foodRepository.save(food);
    }

    @Override
    public Food update(Food food) {
        log.debug("Request to update Food : {}", food);
        return foodRepository.save(food);
    }

    @Override
    public Optional<Food> partialUpdate(Food food) {
        log.debug("Request to partially update Food : {}", food);

        return foodRepository
            .findById(food.getId())
            .map(existingFood -> {
                if (food.getName() != null) {
                    existingFood.setName(food.getName());
                }
                if (food.getDescription() != null) {
                    existingFood.setDescription(food.getDescription());
                }
                if (food.getQuantity() != null) {
                    existingFood.setQuantity(food.getQuantity());
                }
                if (food.getQuantityType() != null) {
                    existingFood.setQuantityType(food.getQuantityType());
                }
                if (food.getOriginalPrice() != null) {
                    existingFood.setOriginalPrice(food.getOriginalPrice());
                }
                if (food.getPrice() != null) {
                    existingFood.setPrice(food.getPrice());
                }
                if (food.getDueDate() != null) {
                    existingFood.setDueDate(food.getDueDate());
                }
                if (food.getImage() != null) {
                    existingFood.setImage(food.getImage());
                }
                if (food.getImageContentType() != null) {
                    existingFood.setImageContentType(food.getImageContentType());
                }

                return existingFood;
            })
            .map(foodRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Food> findAll(Pageable pageable) {
        log.debug("Request to get all Foods");
        return foodRepository.findAll(pageable);
    }

    public Page<Food> findAllWithEagerRelationships(Pageable pageable) {
        return foodRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Food> findOne(Long id) {
        log.debug("Request to get Food : {}", id);
        return foodRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Food : {}", id);
        foodRepository.deleteById(id);
    }
}
