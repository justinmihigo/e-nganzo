// import HomePage from "./pages/homepage"
import AppRoutes from "./routes/app.route"
import { AppProviders } from './providers/AppProviders';

function App() {
 

  return (
    <AppProviders>
      <AppRoutes/>
    </AppProviders>
  )
}

export default App
