import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Productdetails from "./components/Productdetails";
import Cart from './context/Cart';
import ContextCart from './components/ContextCart';
import Uplaodproduct from "./components/Uplaodproduct";
import Loader from "./components/Loader";
import { useState } from "react";
import Productdata from "./context/Productdata";
import Login from "./components/Login";
import Userdata from "./context/Userdata";
import Homepage from "./components/Homepage";
import Products from "./components/Products";
import Yourorders from "./components/Yourorders";

function App() {
  const [loader, setloader] = useState(false)

  const [search, setsearch] = useState("")

  return (
    <Userdata>
    <Productdata >
    <Cart>
    <Router>
        <Header productsearch={search} setsearch={setsearch}/>
        <Loader loader={loader}/>
        <Switch>
          <Route exact path="/">
          <Homepage/>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/shop">
          <Products />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/login">
          <Login setloader={setloader}/>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/shop/:id">
          <Productdetails />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/cart">
          <ContextCart />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/orders">
          <Yourorders />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/services">
          <h1>Comming soon under development</h1>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/about">
          <h1>Comming soon under development</h1>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/blog">
          <h1>Comming soon under development</h1>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/contact">
          <h1>Comming soon under development</h1>
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/uploadproduct">
          <Uplaodproduct setloader={setloader}/>
          </Route>
        </Switch>
    </Router>
    </Cart>
    </Productdata>
    </Userdata>
  );
}

export default App;
