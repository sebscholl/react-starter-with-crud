import React from 'react';
import auth from '../../../../shared/auth';

export default class AuthContainer extends React.Component {
  async componentDidMount() {
    /* Force user to authorize. */
    auth.authorize()
  }

  render () { 
    return <h2>Loading...</h2>
  };
}
