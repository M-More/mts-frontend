import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import { Layout } from 'antd';
import Header from './Header/Header';
import Home from '../Home/Home';
import Search from '../Search/Search';
import routes from './routes';

class Entry extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Content className="mts-app-container">
          <Header />
          <div className="mts-routes-wrapper">
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/search" component={Search} />
              <Redirect from="/*" to="/home" />
            </Switch>
          </div>
          <Layout.Footer className="mts-footer">Shanghai Jiaotong University</Layout.Footer>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Entry;
