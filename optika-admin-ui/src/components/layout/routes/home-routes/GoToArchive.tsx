import {Route} from "react-router";
import React from "react";
import styled from "styled-components";
import {Icon} from "semantic-ui-react";

const StyledDiv = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const GoToArchive = () => (
    <Route render={({history}) => (
        <StyledDiv onClick={() => {
            history.push('/archive')
        }}>
            <Icon size='large' name='folder open' color='brown'/> Archive
        </StyledDiv>
    )}/>
)

export default GoToArchive