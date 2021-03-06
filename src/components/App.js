import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login/Login';
import Entry from './Entry/Entry';
import { actions } from '../redux/actions';
import './App.scss';

import '../static/config/constant.scss';
import '../services/mocks/mocks';
// import '../static/utils/darkChart';

class App extends React.Component {
  componentDidMount() {
    this.props.onAuthChange();
  }

  render() {
    const { userName, userType } = this.props;
    const redirectPath = userName ? '/' : '/login';
    return (
      <BrowserRouter>
        <Switch>
          {userName && <Route path="/" component={Entry} />}
          {!userName && <Route path="/login" component={Login} />}
          <Redirect from="/*" to={redirectPath} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  userType: state.userType,
});
const mapDispatchToProps = {
  onAuthChange: actions.onAuthChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(App);
