import React from 'react';
import { useQuery } from '@apollo/client';

import auth from '../shared/auth'

/**
 * The current user query will only fail if there is
 * no valid ID token.
 */
import { CURRENT_USER_QUERY } from '../shared/graphql';

/**
 * Start login.
 */
const handleLogin = () => {
  auth.authorize()
}

/**
 * Logout user.
 */
const handleLogout = async () => {
  /* Remove auth credentials from local storage */
  localStorage.removeItem('idToken')
  localStorage.removeItem('isAuthorized')

  auth.logout();
}

export default function AuthButton () {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return 'Loading...';

  let v = error 
    ? { f: handleLogin, t: 'Sign In' } 
    : { f: handleLogout, t: `Sign Out (${data.user.email})` }

  return <button onClick={v.f}>{v.t}</button>
}
