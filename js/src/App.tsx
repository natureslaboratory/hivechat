import React from 'react';
import ReactDOM = require('react-dom');
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import questionReducer from './slices/questionSlice'
import { queryApi } from './services/queryApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { newApi } from './services/newApi';
import Header from './components/Header';
import { AppContainer, AppMain, AppMainInner, AppMainOuter } from './components/Layout';
import Home from './pages/Home';
import OrganisationHub from './components/OrganisationHub';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

/** Configure Store */

const store = configureStore({
    reducer: {
        question: questionReducer,
        [queryApi.reducerPath]: queryApi.reducer,
        [newApi.reducerPath]: newApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(queryApi.middleware, newApi.middleware)
})

setupListeners(store.dispatch);

/** End Configure Store */

const App: React.FC = (props) => {
    return (
        <Provider store={store}>
            <Router basename="/app">
                <AppContainer>
                    <Header />
                    <AppMain>
                        <Sidebar />
                        <AppMainOuter>
                            <AppMainInner>
                                <Switch>
                                    <Route path="/organisations" component={OrganisationHub} />
                                    <Route path="/">
                                        <Home />
                                    </Route>
                                </Switch>
                            </AppMainInner>
                            <Footer />
                        </AppMainOuter>
                    </AppMain>
                </AppContainer>
            </Router>
        </Provider>
    )
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const app = document.getElementById("app");
if (app) {
    ReactDOM.render(<App />, app);
}