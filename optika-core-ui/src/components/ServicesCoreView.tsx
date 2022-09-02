import React, {Component} from "react";
import axios, {CancelTokenSource} from "axios";
import {Grid, Modal} from "semantic-ui-react";
import FormModalContentContainer from "./layout/FormModelContentContainer";
import ContactModal from "./ContactModal";
import {HeroBtn, HeroContent, HeroH1, HeroItems, ServicesHeroContainer} from "./layout/HeroElements";
import {
    BrandsLogosImg,
    ContactLensesImg,
    EyeTestImg, EyeTestImg2,
    EyeTestMachineImg,
    GlassesStockImg,
    LuxotticaLogo,
    OptContent,
    OptH2,
    OptH2Custom, RepairImg, RepairImg2, RepairImg3
} from "./layout/CoreElements";
import PxGrid from "./layout/PxGrid";
import {EyeTest, Products, Repair} from "./text-resources/serviceViewTextResources";

interface Props {
}

interface State {
    contactModalOpen: boolean;
    cancelTokenSource: CancelTokenSource
}

class ServicesCoreView extends Component <Props, State> {

    cancelTokenSource = axios.CancelToken.source();

    constructor(props: Props) {
        super(props);

        this.state = {
            contactModalOpen: false,
            cancelTokenSource: this.cancelTokenSource
        }
    }

    renderHeroSegment = () => {
        return (
            <ServicesHeroContainer>
                <HeroContent>
                    <HeroItems>
                        <h1>Optika</h1>
                        <HeroH1>Services</HeroH1>
                        <HeroBtn onClick={() => this.showModal()}>Contact us</HeroBtn>
                    </HeroItems>
                </HeroContent>
            </ServicesHeroContainer>
        )
    }

    renderPageContent = () => {
        return (
            <OptContent>
                <PxGrid>
                    <Grid.Row>
                        <Grid.Column width={16} style={{marginBottom: '3rem'}}>
                            <OptH2Custom>Professional diagnosis, prescription and advice</OptH2Custom>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={8}>
                            <OptH2>{EyeTest.header}</OptH2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8} textAlign={"left"} style={{marginTop: '2rem'}}>
                            <h3>{EyeTest.firstTestHeader}</h3>
                            <p>{EyeTest.firstTest}</p>
                            <h3>{EyeTest.secondTestHeader}</h3>
                            <p>{EyeTest.secondTest}</p>
                            <h3>{EyeTest.thirdTestHeader}</h3>
                            <p>{EyeTest.thirdTest}</p>
                            <h3>{EyeTest.fourthTestHeader}</h3>
                            <p>{EyeTest.fourthTest}</p>
                            <h3>{EyeTest.fifthTestHeader}</h3>
                            <p>{EyeTest.fifthTest}</p>
                            <h3>{EyeTest.sixthTestHeader}</h3>
                            <p>{EyeTest.sixthTest}</p>
                            <h3>{EyeTest.seventhTestHeader}</h3>
                            <p>{EyeTest.seventhTest}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <EyeTestImg/>
                            <EyeTestImg2/>
                            <EyeTestMachineImg/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={8}></Grid.Column>
                        <Grid.Column width={8}>
                            <OptH2>{Products.header}</OptH2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16} textAlign={"left"} style={{marginTop: '2rem'}}>
                            <h3>{Products.text}</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{marginTop: '2rem'}}>
                        <Grid.Column width={3}>
                            <LuxotticaLogo/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <GlassesStockImg/>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <BrandsLogosImg/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <OptH2>{Repair.header}</OptH2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8} textAlign={"left"} style={{marginTop: '2rem'}}>
                            <h3>{Repair.firstHeader}</h3>
                            <p>{Repair.firstParagraph}</p>
                            <h3>{Repair.secondHeader}</h3>
                            <p>{Repair.secondParagraph}</p>
                            <h3>{Repair.thirdHeader}</h3>
                            <p>{Repair.thirdParagraph}</p>
                            <h3>{Repair.fourthHeader}</h3>
                            <p>{Repair.fourthParagraph}</p>
                            <h3>{Repair.fifthHeader}</h3>
                            <p>{Repair.fifthParagraph}</p>
                            <h3>{Repair.sixthHeader}</h3>
                            <p>{Repair.sixthParagraph}</p>
                            <h3>{Repair.seventhHeader}</h3>
                            <p>{Repair.seventhParagraph}</p>
                            <h3>{Repair.eightHeader}</h3>
                            <p>{Repair.eightParagraph}</p>
                            <h3>{Repair.ninthHeader}</h3>
                            <p>{Repair.ninthParagraph}</p>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <RepairImg/>
                            <RepairImg2/>
                            <RepairImg3/>
                        </Grid.Column>
                    </Grid.Row>
                </PxGrid>
            </OptContent>
        )
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.renderHeroSegment()}
                {this.renderContactModal()}
                {this.renderPageContent()}
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

export default ServicesCoreView