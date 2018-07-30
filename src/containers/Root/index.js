// Make App hot-reloadable in development
// We can include it in build because of the low footprint
import { hot } from 'react-hot-loader'

import ConnectedRoot from './Root'

export default hot(module)(ConnectedRoot)
