const chinaMap = (data, title) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  tooltip: { trigger: 'item' },
  legend: {
    orient: 'horizontal',
    x: 'left',
    data: ['舆情数量'],
  },
  visualMap: {
    left: 'right',
    min: 0,
    max: 100,
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    },
    text: ['High', 'Low'],
    calculable: true,
  },
  series: [{
    name: '舆情数量',
    type: 'map',
    mapType: 'china',
    roam: true,
    top: '3%',
    data,
  }],
});

export default chinaMap;
