import {Route} from "react-router";
import React from "react";
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const StyledDiv = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const GoToProducts = () => (
    <Route render={({history}) => (
        <StyledDiv onClick={() => {
            history.push('/products')
        }}>
            <Icon size='large' name='th list' color='teal'/> Products
        </StyledDiv>
    )}/>
)

export default GoToProducts