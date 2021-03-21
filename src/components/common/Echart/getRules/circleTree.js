const circleTree = (data, title) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',

      data: [data],

      top: '18%',
      bottom: '14%',

      layout: 'radial',

      symbol: 'emptyCircle',

      symbolSize: 7,

      initialTreeDepth: 3,

      animationDurationUpdate: 750,

      emphasis: {
        focus: 'descendant',
      },
    },
  ],
});

export default circleTree;
