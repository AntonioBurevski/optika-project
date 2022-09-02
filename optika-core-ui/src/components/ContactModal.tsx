import React, {Component} from "react";
import axios, {CancelTokenSource} from "axios";
import {Button, Grid} from 'semantic-ui-react';
import StyledErrorMessage from "./layout/StyledErrorMessage";
import PxGrid from "./layout/PxGrid";
import {CustomerContactCoreDto} from "../ts-types/api.types";
import {saveContactInfo} from "../services/clientCoreServices";
import {Field, Form as FinalForm, FormRenderProps, FormSpy} from "react-final-form";
import Input from "./layout/Input";
import {required} from "./utils/coreUtils";
import TextArea from "./layout/TextArea";

interface Props {
    onSave: () => void,
    onCancel: () => void,
}

interface State {
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class ContactModal extends Component<Props, State> {

    cancelTokenSource = axios.CancelToken.source();

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            cancelTokenSource: cancelTokenSource
        };
    }

    handleError(error: any) {
        const errorCode = error.errorCode;
        const knownErrors = [{}];

        const violations: Array<any> = error.violations;

        if (violations && violations.length > 0) {
            violations.forEach(violation => {
                if (knownErrors.includes(violation.errorCode)) {
                    this.setErrorMessage(`error.${violation.errorCode}`)
                }
            });
        } else {
            if (knownErrors.includes(errorCode)) {
                this.setErrorMessage(errorCode)
            } else {
                this.setErrorMessage('Something went wrong');
            }
        }
    }

    setErrorMessage = (errorMessage?: string) => {
        this.setState({
            errorMessage: errorMessage
        })
    };

    handleSubmit = async (values: Partial<CustomerContactCoreDto>) => {

        let saveValues: Partial<CustomerContactCoreDto> = {...values};

        const {onSave} = this.props;
        const {cancelTokenSource} = this.state;

        await saveContactInfo(saveValues, cancelTokenSource)
            .then(onSave)
            .catch((e: any) => this.handleError(e.response.data))
    };

    render(): React.ReactNode {

        return (
            <FinalForm
                onSubmit={(values) => this.handleSubmit(values)}
                subscription={{values: true, pristine: true, submitting: true}}
                render={this.renderContactInfoSection}
            />
        );
    }

    renderContactInfoSection = ({handleSubmit, submitting, values, form}: FormRenderProps): React.ReactNode => {

        const {onCancel} = this.props;
        const {errorMessage} = this.state;

        return (
            <form onSubmit={handleSubmit}>
                <PxGrid>
                    {errorMessage &&
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <StyledErrorMessage onDismiss={() => this.setErrorMessage(undefined)}>
                                {errorMessage}
                            </StyledErrorMessage>
                        </Grid.Column>
                    </Grid.Row>
                    }

                    <Grid.Row style={{marginTop: '2rem'}}>
                        <Grid.Column width={5}>First Name:</Grid.Column>
                        <Grid.Column width={11}>
                            <Field
                                name="firstName"
                                component={Input}
                                validate={required}
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}>Last Name:</Grid.Column>
                        <Grid.Column width={11}>
                            <Field
                                name="lastName"
                                component={Input}
                                validate={required}
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}>Email:</Grid.Column>
                        <Grid.Column width={11}>
                            <Field
                                name="email"
                                placeholder="example@mail.com"
                                component={Input}
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}>Phone:</Grid.Column>
                        <Grid.Column width={11}>
                            <Field
                                name="phone"
                                component={Input}
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={5}>Message:</Grid.Column>
                        <Grid.Column width={11}>
                            <Field
                                name="message"
                                component={TextArea}
                                rows={3}
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{marginTop: '2rem'}}>
                        <Grid.Column width={8}>
                            <Button
                                primary
                                compact
                                type="submit"
                                disabled={submitting}
                            >
                                Confirm
                            </Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button
                                color="yellow"
                                compact
                                type="button"
                                disabled={submitting}
                                floated="right"
                                onClick={onCancel}
                            >
                                Close
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </PxGrid>
                <FormSpy subscription={{values: true}}/>
            </form>
        );
    };

}

export default ContactModal;
