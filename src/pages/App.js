import React, { Component } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SaltShakerCrypto from 'saltshaker-crypto';
import Header from '../components/common/Header/Header';
import Home from './Home/Home';
import Search from './Search/Search';
import Login from './Login/Login';
import store from '../redux/store';
import './App.scss';
import '../common/constant.scss';
import '../mocks/mocks';

const { Footer, Content } = Layout;

const Main = () => (
  <>
    <Header />
    <div className="mts-routes-wrapper">
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/search" component={Search} />
        <Redirect from="/*" to="/home" />
      </Switch>
    </div>
    <Footer className="mts-footer">Shanghai Jiaotong University</Footer>
  </>
);

class App extends Component {
  constructor() {
    super();
    console.log(SaltShakerCrypto.SaltShaker.create());
    this.state = {
      auth: sessionStorage.getItem('auth'),
    };
  }

  handleAuthChange = (auth) => {
    this.setState({ auth }, () => {
      console.log(sessionStorage.getItem('auth'));
    });
  };

  render() {
    const { auth } = this.state;
    return (
      <Provider store={store}>
        <Content className="mts-app-container">
          <BrowserRouter>
            { auth ? (
              <Switch>
                <Route path="/" component={Main} />
                <Redirect from="/*" to="/" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/login" render={() => (<Login onAuthChange={this.handleAuthChange} />)} />
                <Redirect from="/*" to="/login" />
              </Switch>
            )}
          </BrowserRouter>
        </Content>
      </Provider>
    );
  }
}

export default App;
