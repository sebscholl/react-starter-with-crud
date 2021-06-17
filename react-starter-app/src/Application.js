import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'

class Application extends React.PureComponent {
  render () {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    )
  }
}

export { Application }
