import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloClient, InMemoryCache} from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const client = new ApolloClient({
  uri: 'http://152.228.215.94:83/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  cache: new InMemoryCache(),
});
