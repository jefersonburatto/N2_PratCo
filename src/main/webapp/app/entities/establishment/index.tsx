import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Establishment from './establishment';
import EstablishmentDetail from './establishment-detail';
import EstablishmentUpdate from './establishment-update';
import EstablishmentDeleteDialog from './establishment-delete-dialog';

const EstablishmentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Establishment />} />
    <Route path="new" element={<EstablishmentUpdate />} />
    <Route path=":id">
      <Route index element={<EstablishmentDetail />} />
      <Route path="edit" element={<EstablishmentUpdate />} />
      <Route path="delete" element={<EstablishmentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EstablishmentRoutes;
