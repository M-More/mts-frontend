import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import React from 'react';
import './WordCloud.scss';

export default class WordCloud extends React.Component {
  wordOption = () => {
    const wordData = this.props.option || [];
    const option = {
      // backgroundColor: '#100c2A',
      backgroundColor: 'white',
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      series: [
        {
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [12, 55],
          rotationRange: [-0, 0, 0, 90],
          textStyle: {
            color: '#2f54eb',
          },
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '90%',
          height: '110%',
          data: wordData,
        },
      ],
    };
    return option;
  };

  render() {
    return (
      <div className="word-chart">
        <ReactEcharts
          style={{
            width: '100%',
            height: '100%'
          }}
          option={this.wordOption()}
          theme="dark"
        />
      </div>
    );
  }
}
