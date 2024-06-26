// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderDiv from "./components/HeaderDiv";
import Login from './components/login/Login'
import HomePage from "./components/home/Home";
import Register from './components/register/register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderDiv />
        <Routes>
          <Route path="/" element={ <Login /> }/>
          <Route path="/login" element={ <Login /> }/>
          <Route path="/register" element={ <Register /> }/>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



