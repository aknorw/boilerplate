import { createAsyncComponent } from 'utils'

export default createAsyncComponent({
  loader: () => import('./Settings' /* webpackChunkName: 'settings' */),
})
