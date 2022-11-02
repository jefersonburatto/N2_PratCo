import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './address.reducer';

export const AddressDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const addressEntity = useAppSelector(state => state.address.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="addressDetailsHeading">Address</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{addressEntity.id}</dd>
          <dt>
            <span id="cep">Cep</span>
          </dt>
          <dd>{addressEntity.cep}</dd>
          <dt>
            <span id="street">Street</span>
          </dt>
          <dd>{addressEntity.street}</dd>
          <dt>
            <span id="number">Number</span>
          </dt>
          <dd>{addressEntity.number}</dd>
          <dt>
            <span id="neighborhood">Neighborhood</span>
          </dt>
          <dd>{addressEntity.neighborhood}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{addressEntity.city}</dd>
          <dt>
            <span id="state">State</span>
          </dt>
          <dd>{addressEntity.state}</dd>
          <dt>Establishment</dt>
          <dd>{addressEntity.establishment ? addressEntity.establishment.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/address" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address/${addressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AddressDetail;
