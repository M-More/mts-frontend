const rules = (title, data, stack) => ({
  title: {
    left: 'center',
    text: title,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: '15%',
    data: data.yAxis.map((item) => item.label),
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  grid: {
    left: '20%',
    right: '5%',
    top: '20%',
    bottom: '15%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.xAxis,
  },
  yAxis: {
    type: 'value',
  },
  series:
    data.yAxis.map((item) => ({
      name: item.label,
      type: 'line',
      // smooth: 'true',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      stack: 'stack',
      data: item.value,
    })),
});

export default rules;
