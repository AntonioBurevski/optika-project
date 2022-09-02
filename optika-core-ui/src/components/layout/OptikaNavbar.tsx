import React from "react";
import {Link, useHistory} from 'react-router-dom';
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const StyledNavBar = styled.div`
.topnav {
  padding-left: 2rem;
  display: flex; 
  font-size: large;
  position: fixed;
  top: 0; 
}

.topnav a {
  display: inline-block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.topnav a.active {
  background-color: #2185d0;
  color: white;
}

.topnav a:hover:not(.active) {
  background-color: #2185d0;
  opacity: 70%;
  color: white;
}

.nav-items {
   padding-top: 0.5rem;
}

.eye-icon {
   margin-right: 42rem;
   cursor: pointer;
}

@media screen and (max-width: 700px) {
  .sidenav {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidenav a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidenav a {
    text-align: center;
    float: none;
  }
}
`;

const StyledNavBrand = styled.div`
    font-size: xx-large;
    font-weight: 600;
    text-shadow: 1px 0px 1px whitesmoke;
    color: #2185d0;
    padding-top: 1.5rem;
    margin-right: 16rem;
    cursor: pointer;
`;

const OptikaNavbar = () => {

    const {push} = useHistory();

    const goHome = () => {
        push('/')
    }

    return (
        <StyledNavBar>
            <div className="topnav">
                <Icon name='eye' color='blue' className='eye-icon' size='huge' onClick={goHome}/>
                <div className="navbar-brand">
                    <StyledNavBrand onClick={goHome}>OPTIKA</StyledNavBrand>
                </div>
                <div className='nav-items'>
                    <Link to='/' style={{marginRight: "1rem"}}>Home</Link>
                    <Link to='/products' style={{marginRight: "1rem"}}>Products</Link>
                    <Link to='/services'>Services</Link>
                </div>
            </div>
        </StyledNavBar>
    )
}

export default OptikaNavbar;