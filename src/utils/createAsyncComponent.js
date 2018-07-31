import loadable from 'react-loadable'

import LoadingComponent from 'components/Loading'

export default ({ loader, loading = LoadingComponent }) => loadable({
  loader, // Loader should be something like () => import('./Page')
  loading,
  delay: 300, // 0.3s
  timeout: 10000, // 10s
})
