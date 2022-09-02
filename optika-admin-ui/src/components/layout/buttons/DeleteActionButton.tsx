import React, {Component} from 'react';
import {Icon, Popup} from 'semantic-ui-react';
import ConfirmActionPopup from "../ConfirmActionPopup";
import StyledActionButton from "./StyledActionButton";

const PopupStyle = {
    borderRadius: 5,
    opacity: 0.7,
    padding: '5px'
};

interface Props {
    disabled?: boolean,
    popupMessage?: string,
    hoverMessage: string,
    trigger?: React.ReactNode,
    onConfirm: () => void
}

interface State {

}

class DeleteActionButton extends Component<Props, State> {

    render(): React.ReactNode {
        const {
            disabled = false,
            hoverMessage,
            popupMessage,
            onConfirm,
            trigger = (<Icon name={'cancel'} color={'red'} size={'large'}/>)
        } = this.props;

        if (popupMessage) {
            return (
                <ConfirmActionPopup
                    message={popupMessage}
                    renderTarget={this.renderDeleteButton()}
                    onConfirmAction={onConfirm}
                    disabled={disabled}
                />
            );
        }
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
        );

    }

    renderDeleteButton = (): React.ReactNode => {
        const {
            disabled = false,
            hoverMessage,
            trigger = (<Icon name={'cancel'} color={'red'} size={'large'}/>)
        } = this.props;

        return (
            <StyledActionButton icon
                                disabled={disabled}
                                type='button'
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
        );
    };

}

export default DeleteActionButton;
