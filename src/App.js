import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Products}></Route>
        <Route path="/product/:id" Component={Product}></Route>
      </Routes>
    </Router>
  );
}

export default App;
