import React from "react"
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

export const StyledActionButtonSc = styled(Button)`
  padding: 2px !important;
  background: transparent !important;

  @media only screen and (max-width: 944px) {
    margin-right: 0;
    width: 20px;
  }
`;

interface DivWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    [key: string]: any
}

export class StyledActionButton extends React.Component<DivWrapperProps> {
    render() {
        const {children, ...rest} = this.props;
        return <StyledActionButtonSc {...rest}>
            {children}
        </StyledActionButtonSc>;
    }
}

export default StyledActionButton;
