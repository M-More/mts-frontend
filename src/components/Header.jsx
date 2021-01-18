import React from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes from '../common/routes';
import './Header.scss';

const history = createBrowserHistory();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'home' };
  }

  handleClick = (e) => { this.setState({ current: e.key }); };

  componentDidMount = () => {
    const { pathname } = this.props.location;
    let text = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
    if (!['home', 'monitor', 'search', 'report', 'manager', 'analysis'].includes(text)) text = 'home';
    this.setState({ current: text });
    history.listen((event) => {
      const test = event.pathname;
      const current = test.substring(test.lastIndexOf('/') + 1, test.length);
      this.setState({ current });
    });
  };

  render() {
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
          { routes.map((route) => (
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
