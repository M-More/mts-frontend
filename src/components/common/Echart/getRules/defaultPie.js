const defaultPie = (data, title, size) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  tooltip: { trigger: 'item' },
  /* legend: {
    orient: 'vertical',
    left: 'left',
    data: data.map((item) => item.label),
  }, */
  series: [{
    type: 'pie',
    radius: '50%',
    data,
  }],
});

export default defaultPie;
