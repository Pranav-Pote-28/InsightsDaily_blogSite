import React from 'react'
import Logo from "../images/daily_logo.png"

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="daily_insights icon" />
      <span>Made by Pranav using <b>React JS</b></span>
    </footer>
  )
}

export default Footer