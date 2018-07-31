import { createAsyncComponent } from 'utils'

export default createAsyncComponent({
  loader: () => import('./Homepage' /* webpackChunkName: 'homepage' */),
})
