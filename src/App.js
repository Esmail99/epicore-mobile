import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import Home from './screens/Home';
import {AUTH_PASSWORD} from '../config';

const httpLink = new HttpLink({
  uri: 'https://epicore.herokuapp.com',
});

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: AUTH_PASSWORD,
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'https://epicore.herokuapp.com/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: AUTH_PASSWORD,
    },
  },
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
