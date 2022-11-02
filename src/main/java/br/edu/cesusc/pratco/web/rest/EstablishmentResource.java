package br.edu.cesusc.pratco.web.rest;

import br.edu.cesusc.pratco.domain.Establishment;
import br.edu.cesusc.pratco.repository.EstablishmentRepository;
import br.edu.cesusc.pratco.service.EstablishmentService;
import br.edu.cesusc.pratco.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.edu.cesusc.pratco.domain.Establishment}.
 */
@RestController
@RequestMapping("/api")
public class EstablishmentResource {

    private final Logger log = LoggerFactory.getLogger(EstablishmentResource.class);

    private static final String ENTITY_NAME = "establishment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstablishmentService establishmentService;

    private final EstablishmentRepository establishmentRepository;

    public EstablishmentResource(EstablishmentService establishmentService, EstablishmentRepository establishmentRepository) {
        this.establishmentService = establishmentService;
        this.establishmentRepository = establishmentRepository;
    }

    /**
     * {@code POST  /establishments} : Create a new establishment.
     *
     * @param establishment the establishment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new establishment, or with status {@code 400 (Bad Request)} if the establishment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/establishments")
    public ResponseEntity<Establishment> createEstablishment(@Valid @RequestBody Establishment establishment) throws URISyntaxException {
        log.debug("REST request to save Establishment : {}", establishment);
        if (establishment.getId() != null) {
            throw new BadRequestAlertException("A new establishment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Establishment result = establishmentService.save(establishment);
        return ResponseEntity
            .created(new URI("/api/establishments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /establishments/:id} : Updates an existing establishment.
     *
     * @param id the id of the establishment to save.
     * @param establishment the establishment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated establishment,
     * or with status {@code 400 (Bad Request)} if the establishment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the establishment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/establishments/{id}")
    public ResponseEntity<Establishment> updateEstablishment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Establishment establishment
    ) throws URISyntaxException {
        log.debug("REST request to update Establishment : {}, {}", id, establishment);
        if (establishment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, establishment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!establishmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Establishment result = establishmentService.update(establishment);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, establishment.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /establishments/:id} : Partial updates given fields of an existing establishment, field will ignore if it is null
     *
     * @param id the id of the establishment to save.
     * @param establishment the establishment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated establishment,
     * or with status {@code 400 (Bad Request)} if the establishment is not valid,
     * or with status {@code 404 (Not Found)} if the establishment is not found,
     * or with status {@code 500 (Internal Server Error)} if the establishment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/establishments/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Establishment> partialUpdateEstablishment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Establishment establishment
    ) throws URISyntaxException {
        log.debug("REST request to partial update Establishment partially : {}, {}", id, establishment);
        if (establishment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, establishment.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!establishmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Establishment> result = establishmentService.partialUpdate(establishment);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, establishment.getId().toString())
        );
    }

    /**
     * {@code GET  /establishments} : get all the establishments.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of establishments in body.
     */
    @GetMapping("/establishments")
    public ResponseEntity<List<Establishment>> getAllEstablishments(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable,
        @RequestParam(required = false, defaultValue = "false") boolean eagerload
    ) {
        log.debug("REST request to get a page of Establishments");
        Page<Establishment> page;
        if (eagerload) {
            page = establishmentService.findAllWithEagerRelationships(pageable);
        } else {
            page = establishmentService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /establishments/:id} : get the "id" establishment.
     *
     * @param id the id of the establishment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the establishment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/establishments/{id}")
    public ResponseEntity<Establishment> getEstablishment(@PathVariable Long id) {
        log.debug("REST request to get Establishment : {}", id);
        Optional<Establishment> establishment = establishmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(establishment);
    }

    /**
     * {@code DELETE  /establishments/:id} : delete the "id" establishment.
     *
     * @param id the id of the establishment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/establishments/{id}")
    public ResponseEntity<Void> deleteEstablishment(@PathVariable Long id) {
        log.debug("REST request to delete Establishment : {}", id);
        establishmentService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
