import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import getRoutes from '../getRoutes';
import './Header.scss';
import { connect } from 'react-redux';
import logout from '../../../services/request/auth/logout';
import login from '../../../services/request/auth/login';
import { actions } from "../../../redux/actions";

const history = createBrowserHistory();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'home' };
    this.userMenu = (
      <Menu
        theme="dark"
      >
        <Menu.Item onClick={this.handleLogout}>
          登出
        </Menu.Item>
      </Menu>
    );
  }

  handleLogout = async () => {
    const result = await logout();
    console.log(result);
    if (result.logout !== 1) alert('登出失败');
    else {
      alert('登出成功');
      localStorage.removeItem('userName');
      localStorage.removeItem('userType');
      this.props.onAuthChange();
      this.props.history.push('/login');
    }
  };

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
    const { userType, userName } = this.props;
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
          <Dropdown
            className="user-menu"
            overlay={this.userMenu}
            arrow
          >
            <span>{userName}</span>
          </Dropdown>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userType: state.userType,
  userName: state.userName,
});
const mapDispatchToProps = {
  onAuthChange: actions.onAuthChange,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Header));
