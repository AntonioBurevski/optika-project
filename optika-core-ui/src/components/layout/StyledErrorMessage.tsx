import React from "react"
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const StyledErrorMessages = styled(Message)`
  width: 100%;

  &.ui.message>.close.icon {
    vertical-align: middle;
    top: auto;
  }
`;

interface DivWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    [key: string]: any
}

export class StyledErrorMessage extends React.Component<DivWrapperProps> {
    render() {
        const {children, ...rest} = this.props;
        return <StyledErrorMessages color='red' {...rest}>
            {children}
        </StyledErrorMessages>;
    }
}

export default StyledErrorMessage;
