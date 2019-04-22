module.exports = {
  title: '阿咏个人站',
  descroption: 'Talk is cheap, show me the code!',
  head: [
    ['link', { rel: 'icon', href: '/code.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Node', link: '/node/' },
      { text: 'React', link: '/react/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Github', link: 'https://github.com/xkux8023' },
    ],
    sidebar: {
      '/vue/': [
        '',
        'vue_1',
        'vue_2'
      ],
      '/react/': [
        '',
        'react_1',
        'react_2'
      ],
      '/node/': [
        '',
        'node_1',
        'node_2'
      ],
      '/javascript/': [
        '',
        'js_1',
        'js_2',
        'js_3'
      ]
    },
    sidebarDepth: 2,
    lastUpdated: 'Last Updated'
  }
}
