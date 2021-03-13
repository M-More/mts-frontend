import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import getRoutes from '../getRoutes';
import './Header.scss';

const history = createBrowserHistory();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'home' };
  }

  handleClick = (e) => { this.setState({ current: e.key }); };

  componentDidMount = () => {
    const { userType } = this.props;
    const { pathname } = this.props.location;
    const routeLinks = getRoutes(userType).map((item) => item.link);
    let text = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
    if (!routeLinks.includes(text)) text = 'home';
    this.setState({ current: text });
    history.listen((event) => {
      const test = event.pathname;
      const current = test.substring(test.lastIndexOf('/') + 1, test.length);
      this.setState({ current });
    });
  };

  render() {
    const { userType } = this.props;
    const { current } = this.state;
    return (
      <div className="mts-header-container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
          className="mts-header"
        >
          { getRoutes(userType).map((route) => (
            <Menu.Item key={route.key}>
              <Link to={route.link}>{route.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Header);
