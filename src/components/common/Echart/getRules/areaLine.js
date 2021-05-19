const areaLine = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.xAxis,
  },
  yAxis: { type: 'value' },
  series: [{
    data: data.yAxis,
    type: 'line',
    areaStyle: {},
    label: {
      'normal': {
        'show': true,
        'textStyle': {
          'fontSize': 18 },
      },
      'emphasis': {
        'show': true,
      },
    },
    smooth: 0.6,
  }],
});

export default areaLine;
