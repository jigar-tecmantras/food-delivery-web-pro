import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function NavigationLink({ to, children }) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      to={to}
    >
      {children}
    </NavLink>
  );
}

const App = () => {
  const token = localStorage.getItem('fd-token');

  return (
    <BrowserRouter>
      <div className="app-frame">
        <header className="app-header">
          <div className="brand">Food Delivery Web Pro</div>
          <nav className="nav-links">
            <NavigationLink to="/">Home</NavigationLink>
            {!token && <NavigationLink to="/login">Login</NavigationLink>}
            {!token && <NavigationLink to="/register">Register</NavigationLink>}
          </nav>
        </header>
        <main className="app-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
