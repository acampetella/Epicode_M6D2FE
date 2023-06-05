import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import blogSearchReducer from "./reducers/blogSearchReducer";
import blogListReducer from "./reducers/blogListReducer";

const reducer = combineReducers({
    blogSearchState: blogSearchReducer,
    blogListState: blogListReducer
});

const store = configureStore({
    reducer
  });
  
const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
        <App />
    </Provider>
  );
