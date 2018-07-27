import React from 'react'

import Button from 'components/Button'

const App = () => (
  <div>
    <h1>
      Hello React
    </h1>
    <Button onClick={() => alert('Clicked')}>
      Click me
    </Button>
  </div>
)

export default App
