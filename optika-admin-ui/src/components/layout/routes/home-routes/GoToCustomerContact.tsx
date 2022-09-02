import {Route} from "react-router";
import React from "react";
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const StyledDiv = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const GoToCustomerContact = () => (
    <Route render={({history}) => (
        <StyledDiv onClick={() => {
            history.push('/customer-contact')
        }}>
            <Icon size='large' name='address book' color='orange'/> Customer Contact
        </StyledDiv>
    )}/>
)

export default GoToCustomerContact