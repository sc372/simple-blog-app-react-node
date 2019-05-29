const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#292961',
      '@link-color': '#1890ff',
      '@success-color': '#52c41a',
      '@warning-color': '#faad14',
      '@error-color': '#f5222d',
    },
  })
)
