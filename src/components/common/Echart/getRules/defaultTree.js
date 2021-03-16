const defaultTree = (data, title) => ({
  title: {
    text: title,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const { data } = params.data;
      return `<div style="max-width: 200px; display: inline-block; white-space: pre-wrap">${data.author}\n${data.content}</div>`;
    },
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',
      data: [data],
      left: '10%',
      right: '10%',
      symbolSize: 7,
      label: {
        position: 'left',
        verticalAlign: 'middle',
        align: 'right',
        fontSize: 9,
      },
      leaves: {
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left',
        },
      },
      emphasis: {
        focus: 'descendant',
      },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
});

export default defaultTree;
