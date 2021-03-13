const defaultPie = (data, title) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: { trigger: 'item' },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: data.map((item) => item.label),
  },
  series: [{
    type: 'pie',
    radius: '50%',
    data,
  }],
});

export default defaultPie;
