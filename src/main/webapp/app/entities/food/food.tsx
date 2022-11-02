import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFood } from 'app/shared/model/food.model';
import { getEntities, reset } from './food.reducer';

export const Food = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(false);

  const foodList = useAppSelector(state => state.food.entities);
  const loading = useAppSelector(state => state.food.loading);
  const totalItems = useAppSelector(state => state.food.totalItems);
  const links = useAppSelector(state => state.food.links);
  const entity = useAppSelector(state => state.food.entity);
  const updateSuccess = useAppSelector(state => state.food.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  return (
    <div>
      <h2 id="food-heading" data-cy="FoodHeading">
        Foods
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/food/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Food
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={foodList ? foodList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {foodList && foodList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('name')}>
                    Name <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    Description <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('quantity')}>
                    Quantity <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('quantityType')}>
                    Quantity Type <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('originalPrice')}>
                    Original Price <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('price')}>
                    Price <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dueDate')}>
                    Due Date <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('image')}>
                    Image <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Establishment <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foodList.map((food, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/food/${food.id}`} color="link" size="sm">
                        {food.id}
                      </Button>
                    </td>
                    <td>{food.name}</td>
                    <td>{food.description}</td>
                    <td>{food.quantity}</td>
                    <td>{food.quantityType}</td>
                    <td>{food.originalPrice}</td>
                    <td>{food.price}</td>
                    <td>{food.dueDate ? <TextFormat type="date" value={food.dueDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>
                      {food.image ? (
                        <div>
                          {food.imageContentType ? <a onClick={openFile(food.imageContentType, food.image)}>Open &nbsp;</a> : null}
                          <span>
                            {food.imageContentType}, {byteSize(food.image)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {food.establishment ? <Link to={`/establishment/${food.establishment.id}`}>{food.establishment.name}</Link> : ''}
                    </td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/food/${food.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`/food/${food.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`/food/${food.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && <div className="alert alert-warning">No Foods found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Food;
