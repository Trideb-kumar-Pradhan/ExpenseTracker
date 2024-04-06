// import logo from "./logo.svg";
import "./App.css";
import AddBalance from "./Component/AddBalance/AddBalance";
import AddExpences from "./Component/AddExpences/AddExpences";
import MainPage from "./Component/MainPage/MainPage";
import ExpencesPieChart from "./Component/Chart/ExpencesPieChart";

function App() {
  return (
    <div className="App">
      <div>
        <MainPage />
      </div>
    </div>
  );
}

export default App;
