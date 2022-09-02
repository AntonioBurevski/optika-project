import React, { Component } from "react"
import { Modal, ModalContentProps } from 'semantic-ui-react';
import styled from 'styled-components';

export const ModalContentContainerSc = styled(Modal.Content)`
  .ui.modal &.content {
    //padding: 1.2rem;
    padding-top: 0.5rem;
  }
`;

export class FormModalContentContainer extends Component<ModalContentProps> {
    render() {
        const {children, ...rest} = this.props;
        return (
            <ModalContentContainerSc {...rest}>
                {children}
            </ModalContentContainerSc>
        );
    }
}

export default FormModalContentContainer;
