import React = require('react');
import ReactDOM = require('react-dom');
import ManageHive from '../components/ManageHive/ManageHive';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import questionReducer from '../slices/questionSlice'

const store = configureStore({
    reducer: {
        question: questionReducer
    }
})

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