import React, { Component } from 'react';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import { sourceTypes, sensitiveLevels, timeRangeOptions, timeOrderOptions } from '../../../constant';
import './SearchCondition.scss';
import { actionCreator } from '../../../redux/actionCreator';

class SearchCondition extends Component {
  handleClick = (type, value) => {
    switch (type) {
      case 'source':
        this.props.setFilter({ currentSource: value.value });
        break;
      case 'sensitive':
        this.props.setFilter({ currentSensitive: value.value });
        break;
      case 'timeRange':
        this.props.setFilter({ currentTimeRange: value.value });
        break;
      case 'timeOrder':
        this.props.setFilter({ currentTimeOrder: value.value });
        break;
      default:
        break;
    }
  };

  render() {
    const { currentTimeRange, currentTimeOrder, currentSensitive, currentSource } = this.props;
    return (
      <div id="conditionDiv">
        <div className="conditionWrapper">
          <span>时间范围：</span>
          <ul className="conditionList timeRange">
            {timeRangeOptions.map((item) => (
              <li
                key={item.value}
                className={currentTimeRange === item.value ? 'active' : ''}
                onClick={() => this.handleClick('timeRange', item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <Divider className="divider" />
        <div className="conditionWrapper">
          <div className="articleOrderWrapper">
            <span>文章排序：</span>
            <ul className="conditionList timeRange">
              {timeOrderOptions.map((item) => (
                <li
                  key={item.value}
                  className={currentTimeOrder === item.value ? 'active' : ''}
                  onClick={() => this.handleClick('timeOrder', item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Divider className="divider" />
        <div className="conditionWrapper">
          <span>敏感属性：</span>
          <ul className="conditionList timeRange">
            {sensitiveLevels.map((item) => (
              <li
                key={item.value}
                className={currentSensitive === item.value ? 'active' : ''}
                onClick={() => this.handleClick('sensitive', item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <Divider className="divider" />
        <div className="conditionWrapper">
          <span>来源类型：</span>
          <ul className="conditionList timeRange">
            {sourceTypes.map((item) => (
              <li
                key={item.value}
                className={currentSource === item.value ? 'active' : ''}
                onClick={() => this.handleClick('source', item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <Divider className="divider" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentTimeRange: state.currentTimeRange,
  currentTimeOrder: state.currentTimeOrder,
  currentSensitive: state.currentSensitive,
  currentSource: state.currentSource,
});

const mapDispatchToProps = {
  setFilter: actionCreator.setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SearchCondition);
