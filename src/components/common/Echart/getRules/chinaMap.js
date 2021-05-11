const chinaMap = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
    top: '2%',
  },
  // tooltip: { trigger: 'item' },
  /* legend: {
    orient: 'horizontal',
    x: 'left',
    data: ['舆情数量'],
  }, */
  visualMap: {
    left: '10%',
    min: data.min,
    max: data.max,
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
    data: data.regions,
  }],
});

export default chinaMap;
