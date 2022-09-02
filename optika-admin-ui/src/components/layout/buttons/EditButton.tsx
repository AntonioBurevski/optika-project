import React, { Component } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import StyledActionButton from "./StyledActionButton";

const PopupStyle = {
    borderRadius: 5,
    opacity: 0.7,
    padding: '7px'
};

interface Props {
    disabled?: boolean,
    hoverMessage: string,
    trigger?: React.ReactNode,
    onConfirm: () => void
}

interface State {

}

class EditActionButton extends Component<Props, State> {

    render(): React.ReactNode {
        const {disabled = false, hoverMessage, trigger = (<Icon name={'edit'}/>), onConfirm} = this.props;

        return (
            <StyledActionButton icon
                                disabled={disabled}
                                type='button'
                                onClick={onConfirm}
            >

                <Popup
                    trigger={trigger}
                    content={hoverMessage}
                    size='small'
                    position='top center'
                    style={PopupStyle}
                    inverted
                />
            </StyledActionButton>
        )
    }

}

export default EditActionButton;
