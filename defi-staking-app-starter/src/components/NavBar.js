import React, { Component } from 'react'
import bank from '../bank.png'
import './NavBar.css'
const Navbar = ({ account }) => {
  return (
    <nav className="navbar">
      <div className="navbar-item">
        <a>
          <img src={bank} width="50" height="30" className="d-inline-block align-top" alt="bank" />
          &nbsp; DAPP Yield Staking (Decentralized Banking)
        </a>
      </div>

      <div className="navbar-item">
        <ul>
          <li>
            <small>ACCOUNT NUMBER: {account}</small>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
