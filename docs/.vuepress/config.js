module.exports = {
  title: '阿咏个人站',
  descroption: 'Talk is cheap, show me the code!',
  head: [
    ['link', { rel: 'icon', href: '/code.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Node', link: '/node/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: '数据结构与算法', link: '/dsaa/' },
      { text: 'Github', link: 'https://github.com/xkux8023' },
    ],
    sidebar: {
      // '/node/': [
      //   '',
      //   'node_1',
      //   'node_2'
      // ],
      '/javascript/': [
        '',
        {
          title: 'ES6',
          collapsable: false,
          children: [
            'js_1',
            'js_2',
            'js_3',
            'js_4',
            'js_5',
            'js_6',
          ]
        },
        {
          title: 'VUE',
          collapsable: false,
          children: [
            'vue_1',
            'vue_2',
            'vue_3',
            'vue_4',
            'vue_5',
          ]
        },
        {
          title: 'REACT',
          collapsable: false,
          children: [
            'react_1',
            'react_2',
          ]
        }
      ],
      '/dsaa/': [
        {
          title: '数据结构',
          collapsable: false,
          children: [
            'ds_1',
            'ds_2',
          ]
        },
        {
          title: '算法',
          collapsable: false,
          children: [
            'algo_1',
          ]
        }
      ]
    },
    sidebarDepth: 4,
    lastUpdated: 'Last Updated'
  }
}
