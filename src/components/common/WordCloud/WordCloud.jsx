import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import React from 'react';
import './WordCloud.scss';

export default class WordCloud extends React.Component {
  wordOption = () => {
    const wordData = this.props.option || [];
    const option = {
      backgroundColor: '#100c2A',
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
            normal: {
              color() {
                const colors = ['#fda67e', '#81cacc', '#cca8ba', '#88cc81', '#82a0c5', '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                return colors[parseInt(Math.random() * 10)];
              },
            },
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
