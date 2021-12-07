import React = require('react');
import ReactDOM = require('react-dom');
import MemberRequests from '../components/MemberRequests';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import questionReducer from '../slices/questionSlice'
import { queryApi } from '../services/queryApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

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


const memberRequests = document.getElementById("memberRequests");
if (memberRequests) {
    console.log(memberRequests.dataset.orgid);
    ReactDOM.render(<App><MemberRequests orgID={parseInt(memberRequests.dataset.orgid)} /></App>, memberRequests);
}