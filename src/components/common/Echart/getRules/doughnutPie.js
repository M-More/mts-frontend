const doughnutPie = (data, title) => ({
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
    radius: ['40%', '50%'],
    avoidLabelOverlap: false,
    label: { show: false },
    labelLine: { show: false },
    data,
  }],
});

export default doughnutPie;