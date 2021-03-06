import React from 'react';
import { connect } from 'react-redux';

import * as authActionCreators from '../actionCreators/authActionCreators';
require("../../css/login.scss");

@connect(state => {
  return {}
})

export default class Login extends React.Component {
  componentDidMount() {
    gapi.signin2.render('g-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'theme': 'dark',
      'onsuccess': this.handleSignIn.bind(this)
    });
  }

  handleSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    let profile = googleUser.getBasicProfile();
    document.getElementById('login-container').style.display = 'none';
    this.props.dispatch(authActionCreators.login(id_token));
  }

  render() {
    return (
      <div id='login-container'>
          <div id="login-title"><i className="fa fa-thumb-tack" />&nbsp;&nbsp;better board</div>
          <p id="login-tagline">all your postings in one spot!</p>
          <div id="g-signin2" />
      </div>
    )
  }
}
