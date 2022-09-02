import React, {Component} from "react";
import OptikaHeroSegment from "./OptikaHeroSegment";
import {Button, Modal} from "semantic-ui-react";
import FormModalContentContainer from "./layout/FormModelContentContainer";
import ContactModal from "./ContactModal";
import HotDealSegment from "./HotDealSegment";
import {getHotDealsToDisplay} from "../services/clientCoreServices";
import axios, {CancelTokenSource} from "axios";
import {ProductCoreDto} from "../ts-types/api.types";
import {noop} from "./utils/coreUtils";
import {BrandsContainer} from "./layout/CoreElements";
import GoToCoreProductView from "./routes/GoToCoreProductView";
import GoToCoreServiceView from "./routes/GoToCoreServiceView";

interface Props {
}

interface State {
    hotDealsToDisplay: ProductCoreDto[]
    contactModalOpen: boolean;
    cancelTokenSource: CancelTokenSource
}

class OptikaHomeView extends Component <Props, State> {

    cancelTokenSource = axios.CancelToken.source();

    constructor(props: Props) {
        super(props);

        this.state = {
            hotDealsToDisplay: [],
            contactModalOpen: false,
            cancelTokenSource: this.cancelTokenSource
        }

        this.fetchData();
    }

    fetchData = async () => {
        const {cancelTokenSource} = this.state;
        await getHotDealsToDisplay(cancelTokenSource)
            .then(response => {
                this.setState({
                    hotDealsToDisplay: response
                })
            })
            .catch(noop)
    }

    render(): React.ReactNode {
        return (
            <div>
                <OptikaHeroSegment showModal={this.showModal}/>
                <HotDealSegment hotDealsToDisplay={this.state.hotDealsToDisplay}/>
                <BrandsContainer>
                    <GoToCoreProductView/>
                    <GoToCoreServiceView/>
                    <h3 style={{marginTop: '10.5rem', opacity: 0.5}}>
                        All Rights Reserved @Optika-Gostivar 2022
                    </h3>
                </BrandsContainer>
                {this.renderContactModal()}
            </div>
        );
    }

    showModal = () => {
        this.setState(({}: State) => {
            return {
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
        const {contactModalOpen} = this.state;

        return (
            <Modal style={{position: 'sticky', height: 'fit-content', width: '30rem', fontFamily: "sans-serif"}}
                open={contactModalOpen} closeOnDimmerClick={true} onClose={() => this.hideModal()}>
                <Modal.Header>Contact us</Modal.Header>
                <FormModalContentContainer>
                    <ContactModal
                        onSave={this.hideModal}
                        onCancel={this.hideModal}
                    />
                </FormModalContentContainer>
            </Modal>
        );
    };
}

export default OptikaHomeView