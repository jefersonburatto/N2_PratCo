import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './food.reducer';

export const FoodDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const foodEntity = useAppSelector(state => state.food.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="foodDetailsHeading">Food</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{foodEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{foodEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{foodEntity.description}</dd>
          <dt>
            <span id="quantity">Quantity</span>
          </dt>
          <dd>{foodEntity.quantity}</dd>
          <dt>
            <span id="quantityType">Quantity Type</span>
          </dt>
          <dd>{foodEntity.quantityType}</dd>
          <dt>
            <span id="originalPrice">Original Price</span>
          </dt>
          <dd>{foodEntity.originalPrice}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{foodEntity.price}</dd>
          <dt>
            <span id="dueDate">Due Date</span>
          </dt>
          <dd>{foodEntity.dueDate ? <TextFormat value={foodEntity.dueDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {foodEntity.image ? (
              <div>
                {foodEntity.imageContentType ? <a onClick={openFile(foodEntity.imageContentType, foodEntity.image)}>Open&nbsp;</a> : null}
                <span>
                  {foodEntity.imageContentType}, {byteSize(foodEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Establishment</dt>
          <dd>{foodEntity.establishment ? foodEntity.establishment.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/food" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/food/${foodEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FoodDetail;
