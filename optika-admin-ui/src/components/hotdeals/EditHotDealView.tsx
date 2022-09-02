import React, {Component} from "react";
import {Field, Form as FinalForm, FormRenderProps, FormSpy} from "react-final-form";
import CheckBox from "../layout/CheckBox";
import {UpsertHotDealDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import Input from "../layout/Input";
import {Button, Dimmer, DropdownProps, Loader, Message} from "semantic-ui-react";
import {composeValidators, mustBeNumber, mustBePositiveNumber, required} from "../../utils/funcionUtils";
import BackButton from "../layout/buttons/BackButton";
import {FormApi, FormState} from "final-form";
import {debounce} from "ts-debounce";
import {editHotDeal, findHotDealById} from "../../services/hotDealServices";
import {RouteComponentProps} from "react-router";
import DatePicker from "../layout/DatePicker";
import styled from "styled-components";
import {errorUtils} from "../../utils/errorUtils";

const StyledDiv = styled.div`
    display: flex;
`

const MsgDiv = styled.div`
    width: 70rem;
    margin-left: 15rem;
`

const PxDiv = styled.div`
    margin-bottom: 0.6rem;
`

const CheckBoxDiv = styled.div`
    margin-bottom: 2rem;
`

const ProductDiv = styled.div`
    margin-left: 40rem;
    margin-bottom: 2.5rem;
    display: flex;
`

const FromDateDiv = styled.div`
    margin-bottom: 2rem;
    margin-left: 26rem;
`

const ToDateDiv = styled.div`
    margin-bottom: 2rem;
    margin-right: 23rem;
    margin-left: 1.5rem;
`

const OldPriceDiv = styled.div`
    margin-bottom: 3.2rem;
    margin-left: 28rem;
    display: inline-flex;
`

const NewPriceDiv = styled.div`
    margin-bottom: 3.1rem;
    display: inline-flex;
    margin-left: 3rem;
`

const StyledLabel = styled.label`
    margin-bottom: 0.5rem;
`

const StyledSpan = styled.span`
    margin-bottom: 0.6rem;
    margin-top: 2rem;
`

interface RouteParams {
    hotDealId?: string
}

interface HotDealFieldProps extends FormState {
}

interface Props extends RouteComponentProps<RouteParams>, DropdownProps {
}

interface State {
    hotDeal?: Partial<UpsertHotDealDto>,
    discount?: string,
    pageDataLoaded: boolean,
    saveSuccess: boolean,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class EditHotDealView extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            pageDataLoaded: false,
            saveSuccess: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;
        const hotDealId = Number(this.props.match.params.hotDealId);

        try {
            const hotDeal = await findHotDealById(hotDealId, cancelTokenSource);
            this.setState({
                hotDeal: hotDeal
            });
        } finally {
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
        cancelTokenSource && cancelTokenSource.cancel("Operation canceled by user");
    }

    handleChange = debounce(({values}: HotDealFieldProps, form: FormApi): void => {
        if (!this.mounted) {
            return;
        }

        const {hotDeal} = this.state;

        if (hotDeal && hotDeal.oldPrice !== undefined && values.newPrice !== undefined && values.newPrice > 0) {
            const diff = hotDeal.oldPrice - values.newPrice;
            const discountPercentage = Math.trunc((diff / hotDeal.oldPrice) * 100);
            this.setState({
                discount: `${discountPercentage} %`
            })
        }
    }, 300)

    handleError(error: any) {
        const errorCode = error.errorCode;
        const knownErrors: Array<string> = [
            errorUtils.unknownProductId,
            errorUtils.unknownHotDealId,
            errorUtils.unknownProductForHotDeal,
            errorUtils.invalidDates
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

    handleSubmit = async (values: Partial<UpsertHotDealDto>) => {

        let saveValues: Partial<UpsertHotDealDto> = {...values};

        const {cancelTokenSource} = this.state;

        const hotDealId = Number(this.props.match.params.hotDealId);

        const onSave = () => {
            if (saveValues) {
                this.setState({
                    saveSuccess: true
                })
            }
            setTimeout(() => {
                this.props.history.push('/hot-deals');
            }, 2000);
        };

        if (saveValues) {
            if (saveValues.fromDate! > saveValues.toDate!) {
                this.setErrorMessage(errorUtils.invalidDates);
            }
            this.setState({
                saveSuccess: true
            })
        }
        await editHotDeal(hotDealId, saveValues, cancelTokenSource)
            .then(onSave)
            .catch(this.handleError)
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

    render(): React.ReactNode {

        return (
            <FinalForm
                onSubmit={(values) => this.handleSubmit(values)}
                initialValues={this.state.hotDeal}
                subscription={{values: true, pristine: true, submitting: true}}
                render={this.renderForm}
            />
        );
    }


    renderForm = ({handleSubmit, submitting, form, values}: FormRenderProps): React.ReactNode => {

        const {hotDeal, discount, pageDataLoaded, saveSuccess, errorMessage} = this.state;

        const validateNewPrice = composeValidators(mustBeNumber, mustBePositiveNumber);

        return (
            <div>
                <div className="container" style={{fontSize: "large"}}>
                    <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "2rem"}}>Edit Hot Deal</h1>
                    {!pageDataLoaded && this.renderLoader()}
                    {hotDeal && pageDataLoaded &&
                    <form onSubmit={handleSubmit}>
                        {saveSuccess &&
                        <MsgDiv>
                            <Message success onDismiss={() => this.setState({saveSuccess: false})}>
                                <p>
                                    Save success.
                                </p>
                            </Message>
                        </MsgDiv>
                        }
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
                                        <Field
                                            label="Active"
                                            name="active"
                                            component={CheckBox}
                                            toggle
                                        />
                                    </CheckBoxDiv>
                                    <ProductDiv>
                                        <label style={{marginRight: "0.8rem"}}> Product: </label>
                                        <strong> {hotDeal.productCode}</strong>
                                    </ProductDiv>
                                    <div>
                                        {values.newPrice && hotDeal.oldPrice! > values.newPrice &&
                                            <strong style={{color: "green"}}>{discount}</strong>
                                        }
                                        {values.newPrice && hotDeal.oldPrice! < values.newPrice &&
                                        <strong style={{color: "red"}}>{discount}</strong>
                                        }
                                    </div>
                                </div>
                                <StyledDiv>
                                    <div className="card col-md-5"
                                         style={{marginTop: "2rem", marginLeft: "6rem", border: "0px"}}>
                                        <OldPriceDiv>
                                            <label> Old price: </label>
                                            <PxDiv>
                                                <strong style={{marginLeft: "0.7rem"}}>
                                                    {hotDeal.oldPrice} €
                                                </strong>
                                            </PxDiv>
                                        </OldPriceDiv>
                                        <FromDateDiv>
                                            <StyledLabel> From date: </StyledLabel>
                                            <Field
                                                name="fromDate"
                                                placeholder="DD/MM/YYYY"
                                                component={DatePicker}
                                                validate={required}
                                                fluid
                                            />
                                        </FromDateDiv>
                                    </div>

                                    <div className="card col-md-5"
                                         style={{marginTop: "2rem", marginLeft: "2rem", border: "0px"}}>
                                        <NewPriceDiv>
                                            <label> New price: </label>
                                            <Field
                                                style={{marginLeft: "1rem", width: "5rem"}}
                                                name="newPrice"
                                                placeholder="€€"
                                                component={Input}
                                                validate={validateNewPrice}
                                            />
                                        </NewPriceDiv>
                                        <ToDateDiv>
                                            <StyledLabel> To date: </StyledLabel>
                                            <Field
                                                name="toDate"
                                                placeholder="DD/MM/YYYY"
                                                component={DatePicker}
                                                validate={required}
                                                disabled={!values.fromDate}
                                                fluid
                                            />
                                        </ToDateDiv>
                                    </div>
                                </StyledDiv>
                                <StyledSpan>
                                    <Button compact type="Submit" primary disabled={submitting}> Save</Button>
                                    <BackButton onBack={() => this.goToPreviousPage()}/>
                                </StyledSpan>

                            </div>
                        </StyledDiv>
                    </form>
                    }
                </div>
                <FormSpy subscription={{values: true}} onChange={formState => this.handleChange(formState, form)}/>
            </div>
        )
    }
}

export default EditHotDealView