import React from 'react';

const rules = (title, data) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 10,
    data: data.map((item) => item.label),
  },
  series: [
    {
      name: title,
      type: 'pie',
      radius: ['40%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data,
    },
  ],
});

export default rules;
