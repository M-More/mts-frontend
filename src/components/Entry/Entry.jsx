import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import { Layout } from 'antd';
import Header from './Header/Header';
import Home from '../Home/Home';
import Search from '../Search/Search';
import View from '../View/View';
import './Entry.scss';
import routes from './routes';

class Entry extends React.Component {
  render() {
    return (
      <Layout className="mts-app-wrap">
        <Header />
        <Layout.Content className="mts-app-body">
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/view" component={View} />
            <Redirect from="/*" to="/home" />
          </Switch>
        </Layout.Content>
        <Layout.Footer className="mts-footer">Shanghai Jiaotong University</Layout.Footer>
      </Layout>
    );
  }
}

export default Entry;
