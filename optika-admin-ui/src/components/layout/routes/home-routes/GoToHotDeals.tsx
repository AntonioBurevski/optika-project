import {Route} from "react-router";
import React from "react";
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const StyledDiv = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const GoToHotDeals = () => (
    <Route render={({history}) => (
        <StyledDiv onClick={() => {
            history.push('/hot-deals')
        }}>
            <Icon size='large' name='fire' color='red'/> Hot Deals
        </StyledDiv>
    )}/>
)

export default GoToHotDeals