// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import { Auth } from './Pages/auth';
import { ExpenseTracker } from './Pages/expense-tracker';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/" exact element={<Auth />}> 
          </Route>
          <Route path ="/expense-tracker" exact element={<ExpenseTracker />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
