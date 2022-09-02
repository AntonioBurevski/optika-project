import {CustomerContactDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import React, {Component} from "react";
import {Dimmer, Icon, Loader, Modal} from "semantic-ui-react";
import moment from "moment";
import DeleteActionButton from "../layout/buttons/DeleteActionButton";
import {deleteCustomerContact, getAllCustomerContacts} from "../../services/customerContactServices";
import FormModalContentContainer from "../layout/ModalContentContainer";
import CustomerContactInfoModal from "./CustomerContactInfoModal";

interface Props {
}

interface State {
    foundCustomerContacts: Array<CustomerContactDto>;
    pageDataLoaded: boolean;
    contactModalOpen: boolean;
    customerContactId?: number;
    errorMessage?: string;
    cancelTokenSource: CancelTokenSource;
}

class ListCustomerContactView extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            foundCustomerContacts: [],
            pageDataLoaded: false,
            contactModalOpen: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;

        try {
            const customerContacts = await getAllCustomerContacts(cancelTokenSource);
            this.setState({
                foundCustomerContacts: customerContacts
            });
        } catch (e: any) {
            this.handleError(e.response.data)
        }finally {
            this.setState({
                pageDataLoaded: true
            })
        }
    }

    componentDidMount(): void {
        this.mounted = true;
    }

    componentWillUnmount(): void {
        this.mounted = false;

        const {cancelTokenSource} = this.state;
        cancelTokenSource && cancelTokenSource.cancel('Operation canceled by user');
    }

    handleError(error: any) {
        const errorCode = error.errorCode;
        const knownErrors: Array<string> = [];

        const violations: Array<any> = error.violations;

        if (violations && violations.length > 0) {
            violations.forEach(violation => {
                if (knownErrors.includes(violation.errorCode)) {
                    this.setErrorMessage(violation.errorCode)
                }
            });
        } else {
            if (knownErrors.includes(errorCode)) {
                this.setErrorMessage(errorCode)
            } else {
                this.setErrorMessage("Something went wrong");
            }
        }
    }

    setErrorMessage = (errorMessage?: string) => {
        this.setState({
            errorMessage: errorMessage
        })
    };

    renderLoader = (): React.ReactNode => {

        return (
            <Dimmer active inverted>
                <Loader inline="centered" size="medium">
                    Loading...
                </Loader>
            </Dimmer>
        );
    };

    deleteCustomerContact = (id: number): void => {
        const {cancelTokenSource} = this.state;
        deleteCustomerContact(id, cancelTokenSource)
            .then(response => {
                this.setState(({foundCustomerContacts}: State) => ({
                    foundCustomerContacts: foundCustomerContacts.filter(
                        (customerContactDto: CustomerContactDto) => customerContactDto.id !== response.id
                    )
                }));
                this.loadPageData();
            })
            .catch((error) => this.handleError(error.response.data))
    };

    render() {

        const {foundCustomerContacts, pageDataLoaded} = this.state;

        return (
            <div>
                <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                    <Icon name='address book' color='orange' style={{marginLeft: "0.5rem"}}/>
                    Customer Contact
                </h1>
                {!pageDataLoaded
                    ? this.renderLoader()
                    : <div>

                        <div className="row" style={{marginLeft: "12rem"}}>
                            <table className="table table-hover table-responsive-xl">
                                <thead>
                                <tr style={{fontSize: "large"}}>
                                    <th> Customer</th>
                                    <th> Email</th>
                                    <th> Phone</th>
                                    <th> Timestamp</th>
                                    <th> Delete</th>
                                    <th> Info</th>
                                </tr>
                                </thead>

                                <tbody style={{fontSize: "medium"}}>
                                {
                                    foundCustomerContacts.map(
                                        customerContact =>
                                            <tr key={customerContact.id}>
                                                <td> {`${customerContact.firstName} ${customerContact.lastName}`}</td>
                                                <td> {customerContact.email}</td>
                                                <td> {customerContact.phone}
                                                </td>
                                                <td>
                                                    {moment(customerContact.timestamp).format("DD.MM.YYYY / HH:mm")}
                                                </td>
                                                <td>
                                                    <DeleteActionButton
                                                        hoverMessage="Delete"
                                                        popupMessage="Are you sure you want to delete this customer contact?"
                                                        onConfirm={() => this.deleteCustomerContact(customerContact.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <Icon
                                                        name='info circle'
                                                        color='teal'
                                                        size='large'
                                                        style={{cursor: 'pointer'}}
                                                        onClick={() => this.showModal(customerContact.id)}
                                                    />
                                                </td>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
                {this.renderContactModal()}
            </div>
        );
    }

    showModal = (customerContactId: number) => {
        this.setState(({}: State) => {
            return {
                customerContactId: customerContactId,
                contactModalOpen: true
            };
        });
    };

    hideModal = () => {
        this.setState(({}: State) => ({
            contactModalOpen: false
        }));
    };

    renderContactModal = (): React.ReactNode => {
        const {contactModalOpen, customerContactId} = this.state;

        return (
            <Modal style={{position: 'sticky', height: 'fit-content', width: '30rem', fontFamily: "sans-serif"}}
                   open={contactModalOpen} closeOnDimmerClick={true} onClose={() => this.hideModal()}>
                <Modal.Header>Customer Contact Info</Modal.Header>
                <FormModalContentContainer>
                    <CustomerContactInfoModal
                        onCancel={this.hideModal}
                        customerContactId={customerContactId}
                    />
                </FormModalContentContainer>
            </Modal>
        );
    };

}

export default ListCustomerContactView