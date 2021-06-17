import React from 'react';

import api from '../../../../shared/api';
import auth from '../../../../shared/auth';
import * as gql from '../../../../shared/graphql';

export default class CallbackContainer extends React.Component {
  async handleAuthentication({ idToken, email }) {
    /**
     * Add idToken to localstorage or application state manager.
     */
    localStorage.setItem("idToken", idToken)
    localStorage.setItem("isAuthorized", true)

    /**
     * Context for making API calls with ID token.
     */
    const context = {
      headers: {
          authorization: `Bearer ${idToken}`,
      }
    }

    try {
     /**
      * Check if user exists in 8base.
      */
      await api.query({
        query: gql.CURRENT_USER_QUERY,
        context
      })
    } catch (e1) {
      console.error(e1)
      /**
      * If user doesn't exist, an error will be
      * thrown, which then the new user can be
      * created using the authResult values.
      */
      await api.mutate({
        mutation: gql.USER_SIGN_UP_MUTATION,
        variables: {
          user: { email: email },
          authProfileId: process.env.REACT_APP_AUTH_PROFILE_ID,
        },
        context
      });  
    }
  }
  

  async componentDidMount() {
    /* Get authResult from auth client after redirect */
    const authResult = await auth.getAuthorizedData();
    /* Identify or create user record using authenticated details */
    await this.handleAuthentication(authResult);
    /* Redirect user to root path */
    this.props.history.replace('/');
  }

  render() {
    return <h2>Loading...</h2>;
  }
}
