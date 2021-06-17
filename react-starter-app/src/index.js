import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/client'

import { Application } from './Application';

import client from './shared/api'
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
    <ApolloProvider client={client}>
      <Application />
    </ApolloProvider>, 
  document.getElementById('root')
);

registerServiceWorker();
