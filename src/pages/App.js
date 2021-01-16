import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './temp/Header';
import './App.css';
import './constant.scss';

const { Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Content>
          <BrowserRouter>
            <Header />
            {/* <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/monitor" component={Monitor} />
              <Route path="/search" component={GlobalSearch} />
              <Route path="/report" component={Report} />
              <Route path="/manager" component={Manager} />
              <Route path="/analysis" component={Analysis} />
              <Redirect from="/*" to="/home" />
            </Switch> */}
            <Footer>Shanghai Jiaotong University</Footer>
          </BrowserRouter>
        </Content>
      </div>
    );
  }
}

export default App;
