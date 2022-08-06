import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Dashboard, DashboardFull, Login, AddReader, Edit, Error, PrivateRoute } from './pages';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <PrivateRoute path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path='/dashboard-full'>
          <DashboardFull />
        </PrivateRoute>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/add-reader' exact>
          <AddReader />
        </PrivateRoute>
        <Route path='/edit/:id'>
          <Edit />
        </Route>

        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
