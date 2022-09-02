import React, {Component} from "react";
import {UpsertHotDealDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import {Dimmer, DropdownProps, Icon, Loader} from "semantic-ui-react";
import {FormState} from "final-form";
import {findHotDealById} from "../../services/hotDealServices";
import {RouteComponentProps} from "react-router";
import styled from "styled-components";
import moment from "moment";
import {errorUtils} from "../../utils/errorUtils";

const StyledDiv = styled.div`
    display: flex;
`

const CheckBoxDiv = styled.div`
    margin-bottom: 3rem;
    display: inline-flex;
`

const StyledFormDiv = styled.div`
    margin-bottom: 2rem;
    display: flex;
    margin-left: 38rem;
`

const PxDiv = styled.div`
    margin-right: 0.5rem;
    margin-left: 0.5rem;
`

const FormDiv = styled.div`
    margin-bottom: 2rem;
    display: flex;
    margin-left: 36rem;
`

const StyledLabel = styled.label`
    margin-right: 0.8rem;
`

interface RouteParams {
    hotDealId?: string
}

interface Props extends RouteComponentProps<RouteParams>, DropdownProps {
}

interface State {
    hotDeal?: UpsertHotDealDto,
    discount?: string,
    pageDataLoaded: boolean,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class HotDealDetailsView extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;
        const hotDealId = Number(this.props.match.params.hotDealId);

        try {
            const hotDeal = await findHotDealById(hotDealId, cancelTokenSource);
            const diff = hotDeal.oldPrice - hotDeal.newPrice;
            const discountPercentage = Math.trunc((diff / hotDeal.oldPrice) * 100);
            this.setState({
                hotDeal: hotDeal,
                discount: `${discountPercentage}%`
            });
        } finally {
            this.setState({
                pageDataLoaded: true
            })
        }
    }

    handleError(error: any) {
        const errorCode = error.errorCode;
        const knownErrors: Array<string> = [
            errorUtils.unknownProductId,
            errorUtils.unknownHotDealId,
            errorUtils.unknownProductForHotDeal
        ];

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

    goToPreviousPage = () => {
        this.props.history.push("/hot-deals")
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

    render = (): React.ReactNode => {

        const {hotDeal, discount, pageDataLoaded, errorMessage} = this.state;

        return (
            <div>
                <div className="container" style={{fontSize: "large"}}>
                    <span>
                        <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                        <Icon name='arrow alternate circle left' color='blue' style={{cursor: 'pointer', textAlign: 'left'}}
                              onClick={() => this.goToPreviousPage()}/>
                            Hot Deal Details
                        </h1>
                    </span>
                    {!pageDataLoaded && this.renderLoader()}
                    {hotDeal && pageDataLoaded &&
                    <StyledDiv>
                        <div className="card col-md-12" style={{marginTop: "1rem", border: "0px"}}>
                            <div className="card-body">
                                {errorMessage
                                && (
                                    <StyledErrorMessage onDismiss={() => this.setErrorMessage()}>
                                        {errorMessage}
                                    </StyledErrorMessage>
                                )
                                }
                                <CheckBoxDiv>
                                    <StyledLabel>Active: </StyledLabel>
                                    <div>{hotDeal.active
                                        ? <Icon color={"green"} name={"check"}/>
                                        : <Icon color={"red"} name={"close"}/>
                                    }</div>
                                </CheckBoxDiv>
                                <StyledFormDiv>
                                    <StyledLabel>Product Code: </StyledLabel>
                                    <strong>{hotDeal.productCode}</strong>
                                </StyledFormDiv>

                                <div className="card col-md-5"
                                     style={{marginTop: "2rem", marginLeft: "2rem", border: "0px"}}>
                                    <FormDiv>
                                        <StyledLabel> Price: </StyledLabel>
                                        <>
                                            <s style={{color: 'red'}}>{`${hotDeal.oldPrice}€`}</s>
                                            <PxDiv> /</PxDiv>
                                            <strong style={{color: 'green'}}>{`${hotDeal.newPrice}€`}</strong>
                                        </>
                                    </FormDiv>

                                    <FormDiv>
                                        <StyledLabel> Discount: </StyledLabel>
                                        <strong>{discount}</strong>
                                    </FormDiv>

                                    <FormDiv>
                                        <StyledLabel> Duration: </StyledLabel>
                                        <strong> {moment(hotDeal.fromDate).format("DD.MM.YYYY")}</strong>
                                        <PxDiv> /</PxDiv>
                                        <strong> {moment(hotDeal.toDate).format("DD.MM.YYYY")}</strong>
                                    </FormDiv>
                                </div>


                            </div>
                        </div>
                    </StyledDiv>
                    }
                </div>
            </div>
        )
    }
}

export default HotDealDetailsView