package br.edu.cesusc.pratco.service.impl;

import br.edu.cesusc.pratco.domain.Establishment;
import br.edu.cesusc.pratco.repository.EstablishmentRepository;
import br.edu.cesusc.pratco.service.EstablishmentService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Establishment}.
 */
@Service
@Transactional
public class EstablishmentServiceImpl implements EstablishmentService {

    private final Logger log = LoggerFactory.getLogger(EstablishmentServiceImpl.class);

    private final EstablishmentRepository establishmentRepository;

    public EstablishmentServiceImpl(EstablishmentRepository establishmentRepository) {
        this.establishmentRepository = establishmentRepository;
    }

    @Override
    public Establishment save(Establishment establishment) {
        log.debug("Request to save Establishment : {}", establishment);
        return establishmentRepository.save(establishment);
    }

    @Override
    public Establishment update(Establishment establishment) {
        log.debug("Request to update Establishment : {}", establishment);
        return establishmentRepository.save(establishment);
    }

    @Override
    public Optional<Establishment> partialUpdate(Establishment establishment) {
        log.debug("Request to partially update Establishment : {}", establishment);

        return establishmentRepository
            .findById(establishment.getId())
            .map(existingEstablishment -> {
                if (establishment.getName() != null) {
                    existingEstablishment.setName(establishment.getName());
                }
                if (establishment.getCnpj() != null) {
                    existingEstablishment.setCnpj(establishment.getCnpj());
                }
                if (establishment.getImage() != null) {
                    existingEstablishment.setImage(establishment.getImage());
                }
                if (establishment.getImageContentType() != null) {
                    existingEstablishment.setImageContentType(establishment.getImageContentType());
                }

                return existingEstablishment;
            })
            .map(establishmentRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Establishment> findAll(Pageable pageable) {
        log.debug("Request to get all Establishments");
        return establishmentRepository.findAll(pageable);
    }

    public Page<Establishment> findAllWithEagerRelationships(Pageable pageable) {
        return establishmentRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Establishment> findOne(Long id) {
        log.debug("Request to get Establishment : {}", id);
        return establishmentRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Establishment : {}", id);
        establishmentRepository.deleteById(id);
    }
}
