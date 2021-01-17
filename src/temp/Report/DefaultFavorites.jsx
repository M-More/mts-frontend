import React, { Component } from 'react';
import { Table, Space, Tag, Button } from 'antd';
import {
  ScissorOutlined,
  TagsOutlined
} from '@ant-design/icons';
import './DefaultFavorites.css';

const columnRender = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          const color = 'volcano';
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: '收藏时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a><ScissorOutlined style={{ fontSize: '18px' }}/></a>
        <a><TagsOutlined style={{ fontSize: '18px' }}/></a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    title: '广州12315和天猫维权部门不作为,天猫青蜂商显质量问题不处理',
    source: '天涯社区',
    tags: ['已收藏'],
    time: '2020-07-30 10:37',
  },
  {
    key: '2',
    title: '哦,糖瓜(外二则)',
    source: '天涯社区',
    tags: ['已收藏'],
    time: '2019-11-26 15:57',
  },
  {
    key: '3',
    title: '外媒解读十九届五中全会｜德媒：中国加强内循环并非谋求“脱钩”',
    source: '定向监测',
    tags: ['已收藏'],
    time: '2019-08-14 22:19',
  },
  {
    key: '4',
    title: '接得住更要做得好——住房和城乡建设部解决建设工程消防设计审查...',
    source: '中国建设报',
    tags: ['已收藏'],
    time: '2019-08-12 16:57',
  },
  {
    key: '5',
    title: '聋哑人时常旷工 借招工诈骗十余名残障同胞被批',
    source: '澎湃新闻(上海)',
    tags: ['已收藏'],
    time: '2019-06-06 20:24',
  },
  {
    key: '6',
    title: '你看人家柚子',
    source: '新浪微博',
    tags: ['已收藏'],
    time: '2019-05-20 16:38',
  },
  {
    key: '7',
    title: '比特币李大鹏',
    source: '新浪微博',
    tags: ['已收藏'],
    time: '2018-10-23 23:45',
  },
  {
    key: '8',
    title: '博物学者段煦出了一本书，告诉读者北极其实是个缤纷世界',
    source: '澎湃新闻网',
    tags: ['已收藏'],
    time: '2018-10-23 13:45',
  },
  {
    key: '9',
    title: '阿好好儿今天也超好',
    source: '新浪微博',
    tags: ['已收藏'],
    time: '2018-09-28 21:54',
  },
];

class DefaultFavorites extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div id="table">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}

export default DefaultFavorites;
