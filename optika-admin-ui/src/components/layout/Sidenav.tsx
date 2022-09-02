import React, {Component} from 'react'
import styled from "styled-components";
import {Link} from 'react-router-dom';
import {Icon} from "semantic-ui-react";

const StyledNavbar = styled.div`
.sidenav {
  height: 100%; 
  width: 160px; 
  position: fixed; 
  font-size: x-large;
  z-index: 1; 
  top: 0; 
  left: 0;
  background-color: whitesmoke;
  overflow-x: hidden;
  -moz-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
  -webkit-box-shadow: 1px 2px 3px rgba(0,0,0,.5);
  box-shadow: 1px 2px 3px rgba(0,0,0,.5);
}

.sidenav a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}

.sidenav a.active {
  background-color: #2185d0;
  color: white;
}

.sidenav a:hover:not(.active) {
  background-color: #2185d0;
  opacity: 70%;
  color: white;
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

.eye-icon {
    padding-top: 20px;
    padding-left: 8px;
    padding-bottom: 10px;
}

.link-items {
    padding-top: 32px;
}
`;

class Sidenav extends Component {

    render() {
        return (
            <StyledNavbar>
                <div className="sidenav">
                    <Icon name='eye' color='blue' size='big' className='eye-icon'/>
                    <div className="link-items">
                        <Link to="/">Home</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/hot-deals">Hot Deals</Link>
                        <Link to="/archive">Archive</Link>
                        <Link to="/customer-contact">Contact</Link>
                        <Link to="/trash">Trash</Link>
                    </div>
                </div>
            </StyledNavbar>
        )
    }
}

export default Sidenav