const areaLine = (data, title) => ({
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
  }],
});

export default areaLine;
