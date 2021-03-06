const chinaMap = (data, title) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: { trigger: 'item' },
  legend: {
    orient: 'horizontal',
    x: 'left',
    data: ['订单量'],
  },
  series: [{
    name: '订单量',
    type: 'map',
    mapType: 'china',
    roam: true,
    top: '3%',
    data,
  }],
});

export default chinaMap;
