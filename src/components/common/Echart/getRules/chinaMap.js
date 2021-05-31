const chinaMap = (data, title, size) => {
  console.log(data);
  return ({
    title: {
      text: title,
      left: 'center',
    },
    visualMap: {
      left: '10%',
      min: data.min,
      max: data.max,
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8'].reverse(),
      },
      text: ['最多舆情', '最少舆情'],
      calculable: true,
    },
    series: [{
      /* label: {
        'normal': {
          'show': true,
          'textStyle': {
            'fontSize': 18 },
        },
        'emphasis': {
          'show': true,
        },
      }, */
      name: '舆情数量',
      type: 'map',
      mapType: 'china',
      roam: true,
      top: '3%',
      data: data.regions,
      label: {
        show: true
      },
    }],
  });
};

export default chinaMap;
