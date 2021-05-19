import React from 'react';
import { connect } from 'react-redux';
import { Input, Switch } from 'antd';
import AutofitWrap from '../../common/AutofitWrap/AutofitWrap';
import { actions } from '../../../redux/actions';
import DataList from '../../common/DataList/DataList';
import './Alert.scss'
import Echart from "../../common/Echart/Echart";

const sensiLayout = [
  { name: '正常', label: '正常', value: 376 },
  { name: '政治敏感', label: '政治敏感', value: 91 },
  { name: '色情低俗', label: '色情低俗', value: 61 },
  { name: '非法营销', label: '非法营销', value: 66 },
  { name: '人身攻击', label: '人身攻击', value: 57 },
  { name: '消息传闻', label: '消息传闻', value: 41 },
];
const emotionTrendLayout = {
  'yAxis': ['1993-', '1980-', '2003-', '1981-', '1984-', '2007-'],
  'xAxis': [
    { 'name': '积极', 'label': '积极', 'value': [14, 10, 6, 12, 13, 9] },
    { 'name': '愤怒', 'label': '愤怒', 'value': [16, 7, 14, 11, 6, 19] },
    { 'name': '悲伤', 'label': '悲伤', 'value': [15, 4, 12, 14, 15, 9] },
    { 'name': '恐惧', 'label': '恐惧', 'value': [6, 14, 8, 11, 3, 3] },
    { 'name': '惊奇', 'label': '惊奇', 'value': [7, 15, 12, 19, 3, 2] },
    { 'name': '无情绪', 'label': '无情绪', 'value': [9, 5, 17, 6, 16, 14] }],
};

class Alert extends React.Component {
  formatEmotionTrendLayout = (raw) => {
    const yAxis = [];
    yAxis.push({
      name: '积极',
      data: raw.xAxis[0].value,
    });
    const negData = raw.xAxis[1].value.map((item, index) => (
      item + raw.xAxis[2].value[index] + raw.xAxis[3].value[index]
    ));
    yAxis.push({
      name: '消极',
      data: negData,
    });
    yAxis.push({
      name: '中立',
      data: raw.xAxis[5].value,
    });
    console.log(yAxis);
    return {
      xAxis: raw.yAxis,
      yAxis,
    };
  };

  render() {
    return (
      <div
        padding={200}
        minHeight={550}
        className="alert-wrap"
      >
        <div className="alert-container">
          <div className="graphs">
            <div className="left-graph">
              <Echart
                title="话题走势图"
                type="basicLine"
                data={[]}
              />
            </div>
            <div className="right-graph">
              <div className="top-graph">
                <Echart
                  title="情感趋势图"
                  type="stackLine"
                  data={this.formatEmotionTrendLayout(emotionTrendLayout)}
                />
              </div>
              <div className="bottom-graph">
                <Echart
                  title="敏感信息分布"
                  type="defaultPie"
                  data={sensiLayout}
                />
              </div>
            </div>
          </div>
          <div>
            敏感信息列表
            <DataList
              data={[]}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  curProgramme: state.curProgramme,
});
const mapDispatchToProps = {
  onProgrammeChange: actions.onProgrammeChange,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Alert);
