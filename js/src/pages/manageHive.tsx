import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import questionReducer from '../slices/questionSlice'
import { queryApi } from '../services/queryApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './AppWrapper';
import { lazy, Suspense } from 'react';

const ManageHive = lazy(() => import("../components/ManageHive/ManageHive"));

const manageHive = document.getElementById("manage-hive");
if (manageHive) {
    ReactDOM.render(
    <App>
        <Suspense fallback={<p>Loading</p>}>
            <ManageHive 
                organisationSlug={manageHive.dataset.organisationslug} 
                hiveID={parseInt(manageHive.dataset.hiveid)} 
                organisationID={parseInt(manageHive.dataset.organisationid)}
                organisationName={manageHive.dataset.organisationname}
                backURL={manageHive.dataset.backurl}
            />
        </Suspense>
    </App>
    , manageHive);
}