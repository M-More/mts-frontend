import React, { Component } from 'react';
import { List, Button } from 'antd';
import './MaterialManage.css';

const data = [
  {
    title: '曝光:天津宁河区芦台步行街被强占强拆导致家破人亡!',
    description: '发布时间：2019-11-26 14:50:01 相同文章：1 来源：天涯社区',
    content: '中国商报关于芦台步行街被暴力拆迁问题媒体采访后写稿天津市宁河······'
  },
  {
    title: '关于修改中央财政困难群众救助等补助资金管理办法的通知',
    description: '发布时间：2019-11-26 06:30:12 相同文章：1 来源：中国扶贫',
    content: '关于修改中央财政困难群众救助等补助资金管理办法的通知 各省······'
  },
  {
    title: '江西省药品集中采购和使用新闻发布会在南昌举行',
    description: '发布时间：2019-11-26 15:01:57 相同文章：1 来源：江西省人民政府网',
    content: '江西省药品集中采购和使用新闻发布会在南昌举行 新闻发布会现······'
  },
  {
    title: '福州市长乐区岱岭隧道及连接线工程标书条款为某设计院量身定制',
    description: '发布时间：2019-11-26 15:07:29 相同文章：1 来源：天涯社区',
    content: '现就岱岭隧道及连接线工程（一期）工程总承包项目工程招标项目业······'
  },
  {
    title: '“零清偿”政府部门将被约谈',
    description: '发布时间：2019-11-26 09:48:47 相同文章：1 来源：法制网',
    content: '法制日报北京11月25日讯 法制日报全媒体记者侯建斌 为贯彻·····'
  },
];

class MaterialManage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div>
          <div id="text">
            <h3>素材库最多加入1000条数据，已经加入条数：5条</h3>
          </div>
          <div id="newButton">
            <Button type="primary">
              生成简报
            </Button>
          </div>
        </div>
        <List
          className="listItem"
          itemLayout="vertical"
          pagination={{
            pageSize: 5,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item
              extra={
                <a>删除</a>
              }
            >
              <List.Item.Meta
                title={<a>{item.title}</a>}
                description={item.description}
                content="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default MaterialManage;
