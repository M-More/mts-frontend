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
                return (
                  `rgb(${
                    Math.round(Math.random() * 255)
                  }, ${
                    Math.round(Math.random() * 255)
                  }, ${
                    Math.round(Math.random() * 255)
                  })`
                );
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
          className="word-chart-inner"
          option={this.wordOption()}
          theme="dark"
        />
      </div>
    );
  }
}
