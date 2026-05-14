// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';
import Home from './pages/home';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

// import Counter from './components/practise';

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src="/images/logo.png" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <h1>Testing React App
      </h1> */}
     
      <Router>

        
        <div>
          <ToastContainer theme='dark' position='top-center'/>
          <Header cartItems={cartItems}/>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>

        </div>
        <Footer />

      </Router>



      
      {/* <Counter/> */}
    </div>
  );
}

export default App;
