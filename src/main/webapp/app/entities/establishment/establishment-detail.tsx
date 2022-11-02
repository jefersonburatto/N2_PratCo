import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './establishment.reducer';

export const EstablishmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const establishmentEntity = useAppSelector(state => state.establishment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="establishmentDetailsHeading">Establishment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{establishmentEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{establishmentEntity.name}</dd>
          <dt>
            <span id="cnpj">Cnpj</span>
          </dt>
          <dd>{establishmentEntity.cnpj}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {establishmentEntity.image ? (
              <div>
                {establishmentEntity.imageContentType ? (
                  <a onClick={openFile(establishmentEntity.imageContentType, establishmentEntity.image)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {establishmentEntity.imageContentType}, {byteSize(establishmentEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>User</dt>
          <dd>{establishmentEntity.user ? establishmentEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/establishment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/establishment/${establishmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default EstablishmentDetail;
