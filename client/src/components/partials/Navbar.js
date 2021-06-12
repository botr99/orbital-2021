import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Avatar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          NUS CCSGP Volunteer Board
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" href="/">
              Home
            </a>
            <a className="nav-link" href="/jobs/new">
              New Job
            </a>
            {user ? (
              <div>
                <Avatar alt={user.result.name}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography variant="h6">{user.result.name}</Typography>
                <Button variant="contained" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                component={Link}
                to="/auth"
                variant="contained"
                color="primary">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
