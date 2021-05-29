import { Route, Switch } from 'react-router-dom';
import TopBar from './components/topBar/TopBar';
import Home from './container/Home';
import Other from './container/Other';

const App: React.FC = () => (
  <div className="container">
    <TopBar />
    <Switch>
      <Route path="/other">
        <Other />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </div>
);

export default App;
