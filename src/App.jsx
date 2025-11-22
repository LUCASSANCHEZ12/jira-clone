import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { routes } from './routes/routes'
import { useRoutes} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  let router = useRoutes(routes)
  return router
}

export default App

