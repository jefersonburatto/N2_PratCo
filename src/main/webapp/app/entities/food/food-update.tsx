import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEstablishment } from 'app/shared/model/establishment.model';
import { getEntities as getEstablishments } from 'app/entities/establishment/establishment.reducer';
import { IFood } from 'app/shared/model/food.model';
import { QuantityType } from 'app/shared/model/enumerations/quantity-type.model';
import { getEntity, updateEntity, createEntity, reset } from './food.reducer';

export const FoodUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const establishments = useAppSelector(state => state.establishment.entities);
  const foodEntity = useAppSelector(state => state.food.entity);
  const loading = useAppSelector(state => state.food.loading);
  const updating = useAppSelector(state => state.food.updating);
  const updateSuccess = useAppSelector(state => state.food.updateSuccess);
  const quantityTypeValues = Object.keys(QuantityType);

  const handleClose = () => {
    navigate('/food');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(id));
    }

    dispatch(getEstablishments({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dueDate = convertDateTimeToServer(values.dueDate);

    const entity = {
      ...foodEntity,
      ...values,
      establishment: establishments.find(it => it.id.toString() === values.establishment.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dueDate: displayDefaultDateTime(),
        }
      : {
          quantityType: 'UNITY',
          ...foodEntity,
          dueDate: convertDateTimeFromServer(foodEntity.dueDate),
          establishment: foodEntity?.establishment?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="pratcoApp.food.home.createOrEditLabel" data-cy="FoodCreateUpdateHeading">
            Create or edit a Food
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="food-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="food-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="food-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Quantity"
                id="food-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Quantity Type" id="food-quantityType" name="quantityType" data-cy="quantityType" type="select">
                {quantityTypeValues.map(quantityType => (
                  <option value={quantityType} key={quantityType}>
                    {quantityType}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label="Original Price"
                id="food-originalPrice"
                name="originalPrice"
                data-cy="originalPrice"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Price"
                id="food-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Due Date"
                id="food-dueDate"
                name="dueDate"
                data-cy="dueDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedBlobField
                label="Image"
                id="food-image"
                name="image"
                data-cy="image"
                openActionLabel="Open"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="food-establishment" name="establishment" data-cy="establishment" label="Establishment" type="select">
                <option value="" key="0" />
                {establishments
                  ? establishments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/food" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FoodUpdate;
