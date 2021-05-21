const stackLine = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: data.yAxis.map((item) => item.name),
    left: 'right'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.xAxis,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C',
    },
  },
  series: data.yAxis.map(item => ({
    ...item,
    type: 'line',
    markPoint: {
      data: [
        { type: 'max', name: '最大值' },
        { type: 'min', name: '最小值' },
      ],
    },
  })),
});

export default stackLine;
