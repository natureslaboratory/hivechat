import React = require('react');
import ReactDOM = require('react-dom');
import ManageHive from '../components/ManageHive/ManageHive';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import questionReducer from '../slices/questionSlice'
import { queryApi } from '../services/queryApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = configureStore({
    reducer: {
        question: questionReducer,
        [queryApi.reducerPath]: queryApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(queryApi.middleware)
})

setupListeners(store.dispatch);

const App: React.FC = (props) => {
    return (
        <Provider store={store}> 
            {props.children}
        </Provider>
    )
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const manageHive = document.getElementById("manage-hive");
if (manageHive) {
    ReactDOM.render(
    <App>
        <ManageHive 
            organisationSlug={manageHive.dataset.organisationslug} 
            hiveID={parseInt(manageHive.dataset.hiveid)} 
            organisationID={parseInt(manageHive.dataset.organisationid)}
            organisationName={manageHive.dataset.organisationname}
            backURL={manageHive.dataset.backurl}
        />
    </App>
    , manageHive);
}