// Make rootReducer hot-reloadable in development
// We can include it in build because of the low footprint
import { hot } from 'react-hot-loader'

import basic from './basic/reducer'

export default hot(module)({
  basic,
})