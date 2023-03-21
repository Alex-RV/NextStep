import React from 'react'
import Container from './components/Container'

export default function team() {
  return (
    <div >

    <input id="toggle" type="checkbox"/>

    
    <label className="toggle-container" htmlFor="toggle">
     
      <span className="button button-toggle"></span>
    </label>

    <nav className="nav">
      <a className="nav-item" href="">Dashboard</a>
      <a className="nav-item" href="">History</a>
      <a className="nav-item" href="">Statistics</a>
      <a className="nav-item" href="">Settings</a>
    </nav>

    <section className="dummy-content">
      <div className="circle"></div>
      <div className="text">
        <span></span><span></span>
      </div>
      <div className="square-top"></div>
      <div className="square-behind"></div>
    </section>
  </div>
  )
}
