import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

interface Props {
    buttonMessage: string,
    onClick: () => void,
    disabled?: boolean,
    hideIcon?: boolean,
    type?: string
}

interface State {

}

const StyledSpan = styled.span`
  margin-left: 5px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 0 !important;
`;

class AddButton extends Component<Props, State> {

    render(): React.ReactNode {
        const {buttonMessage, hideIcon, onClick, disabled, type = "submit"} = this.props;

        return (
            <Button type={type} compact disabled={disabled} primary floated='right' onClick={onClick}>
                {
                    (hideIcon === undefined || !hideIcon) &&
                    <StyledIcon name="add"/>
                }
                <StyledSpan>
                    {buttonMessage}
                </StyledSpan>
            </Button>
        )
    }

}

export default AddButton;
