import {Route} from "react-router";
import React from "react";
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const StyledDiv = styled.button`
  font-size: 22px;
  box-shadow: 0px -2px 2px rgba(34,34,34,0.6);  
`;

const GoToHotDealsTrash = () => (
    <Route render={({history}) => (
        <StyledDiv onClick={() => {
            history.push('/trash/hot-deals')
        }}>
            <Icon.Group size='large' style={{marginRight: "0.5rem"}}>
                <Icon name='trash alternate' color='grey' style={{marginLeft: "0.5rem"}}/>
                <Icon corner="top right" name='fire' color='red'/>
            </Icon.Group>
            Hot Deals
        </StyledDiv>
    )}/>
)

export default GoToHotDealsTrash