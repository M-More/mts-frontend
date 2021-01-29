import React, { Component } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home/Home';
import Search from './Search/Search';
import store from '../redux/store';
import './App.scss';
import '../common/constant.scss';
import SaltShakerCrypto from 'saltshaker-crypto';
// import '../mocks/mocks';

const { Footer, Content } = Layout;

class App extends Component {
  componentDidMount() {
    console.log(SaltShakerCrypto.SaltShaker.create());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="mts-app-container">
          <Content>
            <BrowserRouter>
              <Header />
              <div className="mts-routes-wrapper">
                <Switch>
                  <Route path="/home" exact component={Home} />
                  <Route path="/search" component={Search} />
                  <Redirect from="/*" to="/home" />
                </Switch>
              </div>
              <Footer className="mts-footer">Shanghai Jiaotong University</Footer>
            </BrowserRouter>
          </Content>
        </div>
      </Provider>
    );
  }
}

export default App;
