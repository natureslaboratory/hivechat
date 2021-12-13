import React, { Suspense } from 'react';
import lazy from "react-lazy-with-preload"
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation
} from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import questionReducer from './slices/questionSlice'
import sidebarReducer from './slices/sidebarSlice'
import { queryApi } from './services/queryApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { newApi } from './services/newApi';
import Header from './components/shared/Header/Header';
import { AppContainer, AppMain, AppMainInner, AppMainOuter } from './components/Layout';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Login from './components/Login';

const Account = lazy(() => import("./pages/Account"));
const OrganisationsHub = lazy(() => import("./pages/OrganisationsHub"));

/** Configure Store */

const store = configureStore({
    reducer: {
        question: questionReducer,
        sidebar: sidebarReducer,
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
                                <Suspense fallback={<p>Loading page...</p>}>
                                    <Switch>
                                        <Route exact strict path="/:url*" render={props => <Redirect to={`${props.location.pathname}/`}/>} />
                                        <Route path="/organisations" component={OrganisationsHub} />
                                        <Route path="/login" component={Login} />
                                        <Route path="/account">
                                            <Account />
                                        </Route>
                                        <Route path="/">
                                            <p>Home</p>
                                        </Route>
                                    </Switch>
                                </Suspense>
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