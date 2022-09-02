import React, {Component} from "react";
import {ArchiveDto, UpsertArchiveDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import {Dimmer, DropdownProps, Icon, Loader} from "semantic-ui-react";
import {RouteComponentProps} from "react-router";
import styled from "styled-components";
import moment from "moment";
import {errorUtils} from "../../utils/errorUtils";
import {findArchiveById} from "../../services/archiveServices";
import BackButton from "../layout/buttons/BackButton";

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
    archiveId?: string
}

interface Props extends RouteComponentProps<RouteParams>, DropdownProps {
}

interface State {
    archive?: ArchiveDto,
    pageDataLoaded: boolean,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class ArchiveDetailsView extends Component<Props, State> {

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
        const archiveId = Number(this.props.match.params.archiveId);

        try {
            const archive = await findArchiveById(archiveId, cancelTokenSource);
            this.setState({
                archive: archive,
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
            errorUtils.unknownArchiveId,
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
        this.props.history.push("/archive")
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

        const {archive, pageDataLoaded, errorMessage} = this.state;

        return (
            <div>
                <div className="container" style={{fontSize: "large"}}>
                    <span>
                        <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                        <Icon name='arrow alternate circle left' color='blue' style={{cursor: 'pointer', textAlign: 'left'}}
                              onClick={() => this.goToPreviousPage()}/>
                            Archive Details
                        </h1>
                    </span>
                    {!pageDataLoaded && this.renderLoader()}
                    {archive && pageDataLoaded &&
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
                                    <StyledLabel>Hot Deal: </StyledLabel>
                                    <div>{archive.hotDeal
                                        ? <Icon color={"green"} name={"check"}/>
                                        : <Icon color={"red"} name={"close"}/>
                                    }</div>
                                </CheckBoxDiv>
                                <StyledFormDiv>
                                    <StyledLabel>Product Code: </StyledLabel>
                                    <strong>{archive.productCode}</strong>
                                </StyledFormDiv>

                                <div className="card col-md-5"
                                     style={{marginTop: "2rem", marginLeft: "2rem", border: "0px"}}>
                                    <FormDiv>
                                        <StyledLabel> Price: </StyledLabel>
                                        <strong>{archive.price}€</strong>
                                    </FormDiv>

                                    <FormDiv>
                                        <StyledLabel> Timestamp: </StyledLabel>
                                        <strong> {moment(archive.archivedDateTime).format("DD.MM.YYYY/HH:mm")}</strong>
                                    </FormDiv>
                                </div>

                                <StyledFormDiv>
                                    <StyledLabel> Remarks: </StyledLabel>
                                    <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                        <div><em>{archive.remarks}</em></div>
                                    </div>
                                </StyledFormDiv>


                            </div>
                        </div>
                    </StyledDiv>
                    }
                </div>
            </div>
        )
    }
}

export default ArchiveDetailsView