const area = (title, data) => ({
  title: {
    text: title,
    left: 'center',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.xAxis,
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    data: data.yAxis,
    type: 'line',
    areaStyle: {},
  }],
});

export default area;
