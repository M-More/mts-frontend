const connGraph = (data, title) => ({
  title: {
    text: title,
    left: 'center',
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
              color: 'rgba(255, 255, 255, 1)',
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
