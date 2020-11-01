import React, { Component }  from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory() // history模式

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      current: 'home'
    }
  }
  handleClick = e => {
    this.setState({ current: e.key });
  }
  componentDidMount = () => {
    let moren = this.props.location.pathname
    let text = moren.substring(moren.lastIndexOf('/') + 1, moren.length)
    ![ 'home', 'monitor', 'search', 'report', 'manager', 'analysis' ].includes(text) && (text = 'home')
    this.setState({
      current: text
    })
    history.listen((event) => {
      let test = event.pathname
      let text = test.substring(test.lastIndexOf('/') + 1, test.length)
      this.setState({
        current: text
      })
    })
  }
  render() {
    const { current } = this.state;
    return(
      <div>
        <Menu 
          onClick = { this.handleClick } 
          selectedKeys={ [ current ] } 
          theme = 'dark'
          mode = 'horizontal'
          style={ { lineHeight: '64px' } }
        >
          <Menu.Item key="home">
            <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="monitor">
            <Link to="/monitor">舆情监测</Link>
          </Menu.Item>
          <Menu.Item key="search">
            <Link to="/search">全文搜索</Link>
          </Menu.Item>
          <Menu.Item key="report">
            <Link to="/report">舆情简报</Link>
          </Menu.Item>
          <Menu.Item key="manager">
            <Link to="/manager">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="analysis">
            <Link to="/analysis">事件分析</Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default withRouter(Header)