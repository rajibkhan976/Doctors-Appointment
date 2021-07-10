import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CalendarComponent from './components/CalendarComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ CalendarComponent } />
          <Route exact path="/year/month/:y/:m" component={ CalendarComponent } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
