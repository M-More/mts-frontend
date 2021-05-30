const basicLine = (data, title, size) => {
  return {
    title: {
      text: title,
      left: 'center',
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [{
      data: data.yAxis,
      type: 'line',
    }],
  };
};

export default basicLine;