import { useRoutes } from "react-router-dom";
import { useState } from "react";
import { routes } from './routes/routes';

function App() {
  const [count, setCount] = useState(0);
  let router = useRoutes(routes);
  return router;
}

export default App;