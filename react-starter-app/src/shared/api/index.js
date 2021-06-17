/* eslint array-callback-return: "off" */
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context";

import {
  from,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

/**
 * A terminating link that fetches GraphQL results from
 * a GraphQL endpoint over an http connection.
 *
 *   docs: https://www.apollographql.com/docs/link/links/http/
 *
 * The 8base workspace endpoint goes here.
 */
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_WORKSPACE_ENDPOINT,
});

/**
 * Error Link takes a function that is called in the event of an error.
 * This function is called to do some custom logic when a GraphQL or
 * network error happens.
 *
 *   docs: https://www.apollographql.com/docs/link/links/error/
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

/**
 * Takes a function that returns either an object or a promise that
 * returns an object to set the new context of a request.
 *
 *   docs: https://www.apollographql.com/docs/link/links/context/
 *
 * Here we collect the authentication token from the auth module to
 * add required bearer token to the headers.
 */
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem('idToken')}`,
      ...headers
    }
  }
})

/**
 * The ApolloClient class is the core API for Apollo, which we're using
 * to handle are GraphQL requests to the API.
 */
export default new ApolloClient({
  /* Concatenate the many links */
  link: from([authLink, errorLink, httpLink]),
  /* Initialize the cache for helping performance */
  cache: new InMemoryCache(),
  connectToDevTools: true,
  fetchPolicy: 'no-cache'
})