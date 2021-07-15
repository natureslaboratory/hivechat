import React = require('react');
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
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

export default App;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch