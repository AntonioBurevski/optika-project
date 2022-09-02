import React, {Component, ReactNode} from "react";
import {Button, Grid, Header, Popup} from 'semantic-ui-react';
import PxGrid from "./PxGrid";
import FormButtonsRow from "./FormButtonsRow";

interface Props {
    message?: string,
    onOpen?: () => void,
    poperDependencies?: any[],
    onConfirmAction: () => void,
    renderTarget: React.ReactNode,
    position?:
        | 'top left'
        | 'top right'
        | 'bottom right'
        | 'bottom left'
        | 'right center'
        | 'left center'
        | 'top center'
        | 'bottom center',
    disabled?: boolean,
    renderContent?: (toggle?: () => void) => ReactNode,
    style?: Object
}

interface State {
    popupOpen: boolean
}

class ConfirmActionPopup extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            popupOpen: false
        }
    }

    togglePopup = () => {
        this.setState(({popupOpen}: State) => ({
            popupOpen: !popupOpen
        }));
    };

    onConfirm = () => {
        this.togglePopup();
        this.props.onConfirmAction();
    };

    render(): React.ReactNode {

        const {
            renderTarget,
            position,
            disabled,
            onOpen,
            renderContent = this.renderContent,
            style
        } = this.props;

        const {popupOpen} = this.state;

        return (
            <Popup
                trigger={(<span className="trigger-wrapper">{renderTarget}</span>)}
                content={renderContent(this.togglePopup)}
                open={popupOpen}
                onClose={() => !disabled && this.togglePopup()}
                onOpen={() => {
                    if (!disabled) {
                        this.togglePopup();

                        if (onOpen) {
                            onOpen();
                        }
                    }
                }}
                on='click'
                position={position || 'top center'}
                hideOnScroll
                style={style}
            />
        );
    };

    renderContent = (toggle: () => void): React.ReactNode => {

        const {message} = this.props;
        return (
            <PxGrid>
                <Header style={{backgroundColor: 'white'}} size="medium">{message}</Header>
                <FormButtonsRow style={{marginTop: "0.2rem"}}>
                    <Button compact primary onClick={this.onConfirm}>Yes</Button>
                    <Button compact onClick={this.togglePopup}>No</Button>
                </FormButtonsRow>
            </PxGrid>
        );
    }
}

export default ConfirmActionPopup;
