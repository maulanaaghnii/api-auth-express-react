import React from 'react'
import  axios  from 'axios'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
  const history = useNavigate();
  const Logout = async() => {
    try {
        await axios.delete('http://localhost:5000/logout');
        history("/")
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Hello%21_Logo.jpg?20210822094933" height="28" alt='logo'/>
        </a>
    
        <a href='/' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href='/' className="navbar-item">
            Home
          </a>
        </div>
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button onClick={Logout} className="button is-light">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
