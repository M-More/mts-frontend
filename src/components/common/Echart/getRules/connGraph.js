/* const connGraph = (data, title) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  tooltip: {
    formatter: (params) => {
      return `<div><div>节点${params.data.id}：${params.data.time}</div><div>摘要信息:${params.data.summary}</div></div>`
    },
  },
  toolbox: {
    show: true,
    feature: {
      restore: { show: true },
      magicType: { show: true, type: ['force', 'chord'] },
      saveAsImage: { show: true },
    },
  },
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      name: title,
      ribbonType: false,
      type: 'graph',
      layout: 'none',
      data: data.nodes,
      links: data.links,
      categories: data.categories,
      roam: true,
      label: {
        position: 'right',
        formatter: '{b}',
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3,
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: {
          width: 10,
        },
      },

      itemStyle: {
        normal: {
          label: {
            show: true,
            textStyle: {
              color: 'rgba(0, 0, 0, 1)',
              fontWeight: 'bolder',
            },
          },
          nodeStyle: {
            brushType: 'both',
            borderColor: 'rgba(0, 0, 255, 1)',
            borderWidth: 1,
          },
          linkStyle: {
            type: 'curve',
          },
        },
        emphasis: {
          label: {
            show: false,
            // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
          },
          nodeStyle: {
            r: 50,
          },
          linkStyle: {},
        },
      },
      useWorker: false,
      minRadius: 50,
      maxRadius: 50,
      gravity: 1.1,
      scaling: 1.1,
    },
  ],
});

export default connGraph;
*/

const connGraph = (data, title) => ({
  title: {
    text: title,
    left: 'center',
    top: '5%',
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      const { data } = params.data;
      return '<div style="max-width: 200px; display: inline-block; white-space: pre-wrap">' +
        `<div>事件${data.clusterNum}:</div>` +
        `<div>时间${data.time}</div>` +
        `<div style="max-height: 150px; overflow: hidden; text-overflow: ellipsis">${data.summary}</div>` +
      '</div>';
    },
    triggerOn: 'mousemove',
  },
  series: [
    {
      type: 'tree',
      data: [data],
      roam: true,
      left: '10%',
      right: '10%',
      symbol: 'circle',
      symbolSize: 30,
      label: {
        position: 'right',
        left: '50%',
        verticalAlign: 'middle',
        align: 'left',
        fontSize: 14,
        fontWeight: 'bolder',
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
      initialTreeDepth: [-1],
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
});

export default connGraph;
