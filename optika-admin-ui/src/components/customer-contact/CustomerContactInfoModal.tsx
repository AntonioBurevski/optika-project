import React, {Component} from "react";
import axios, {CancelTokenSource} from "axios";
import {Button, Grid} from 'semantic-ui-react';
import PxGrid from "../layout/PxGrid";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import {CustomerContactDto} from "../../ts-types/api.types";
import {findCustomerContactById} from "../../services/customerContactServices";
import moment from "moment";

interface Props {
    onCancel: () => void,
    customerContactId?: number
}

interface State {
    customerContact?: CustomerContactDto,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class CustomerContactInfoModal extends Component<Props, State> {

    cancelTokenSource = axios.CancelToken.source();

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            cancelTokenSource: cancelTokenSource
        };

        const customerContactId = this.props.customerContactId;
        if (customerContactId) {
            findCustomerContactById(customerContactId, cancelTokenSource)
                .then(response => this.setState({customerContact: response}))
                .catch((e: any) => this.handleError(e.response.data))
        }
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

    render(): React.ReactNode {

        const {onCancel} = this.props;
        const {customerContact, errorMessage} = this.state;

        const timestamp = customerContact
            ? moment(customerContact.timestamp).format("MMM, DD YYYY - HH:mm")
            : '';

        return (
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

                {customerContact &&
                <>
                    <Grid.Row style={{marginTop: '1rem'}}>
                        <Grid.Column width={5}>First Name:</Grid.Column>
                        <Grid.Column width={11}><strong>{customerContact.firstName}</strong></Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{marginTop: '1rem'}}>
                        <Grid.Column width={5}>Last Name:</Grid.Column>
                        <Grid.Column width={11}><strong>{customerContact.lastName}</strong></Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{marginTop: '1rem'}}>
                        <Grid.Column width={5}>Timestamp:</Grid.Column>
                        <Grid.Column width={11}><strong>{timestamp}</strong></Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{marginTop: '1rem'}}>
                        <Grid.Column width={5}>Phone:</Grid.Column>
                        <Grid.Column width={11}><strong>{customerContact.phone}</strong></Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{marginTop: '1rem'}}>
                        <Grid.Column width={5}>Email:</Grid.Column>
                        <Grid.Column width={11}><strong>{customerContact.email}</strong></Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{marginTop: '2rem'}}>
                        <Grid.Column width={5}>Message:</Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{marginBottom: '2rem'}}>
                        <Grid.Column width={16}><i>{customerContact.message}</i></Grid.Column>
                    </Grid.Row>
                </>
                }
                {!customerContact && <div>Customer contact loading...</div>}
            </PxGrid>
        );
    }

}

export default CustomerContactInfoModal;
