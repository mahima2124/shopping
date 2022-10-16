import './App.css';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Cart from './pages/Cart';
import Item from './pages/Item';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import Signup from './pages/SignUp';
import Login from './pages/Login';


function App() {
  return (
    <Provider store ={store}>
    <BrowserRouter>
    <NavBar/>
     <Routes>
      <Route path = "/signUp" element={<Signup/>}/>
      <Route path ='/login' element = {<Login/>}/>
      <Route path = "/" element= {<Home/>}/>
      <Route path = "/item" element= {<Item/>}/>
      <Route path = "/cart" element= {<Cart/>}/>
     </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
