import {Button, Dimmer, DropdownProps, Loader, Message} from "semantic-ui-react";
import {FormApi, FormState} from "final-form";
import {DropdownOption, required} from "../../utils/funcionUtils";
import axios, {CancelTokenSource} from "axios";
import React, {Component} from "react";
import {findProductById, getAllProducts} from "../../services/productServices";
import {UpsertArchiveDto} from "../../ts-types/api.types";
import {saveToArchive} from "../../services/archiveServices";
import {Field, Form as FinalForm, FormRenderProps, FormSpy} from "react-final-form";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import FinalFormSelectUI from "../layout/Select";
import DatePicker from "../layout/DatePicker";
import BackButton from "../layout/buttons/BackButton";
import styled from "styled-components";
import Input from "../layout/Input";
import {timeFormatOnFocus, timeInputFormat, timeValidator} from "../../utils/dateUtils";
import TextArea from "../layout/TextArea";

const StyledDiv = styled.div`
    display: flex;
`

const MsgDiv = styled.div`
    width: 70rem;
    margin-left: 15rem;
`

const PxDiv = styled.div`
    margin-left: 0.6rem;
    margin-right: 0.6rem;
`

const FormDiv = styled.div`
    margin-bottom: 2rem;
    display: flex;
    margin-left: 28rem;
`

const StyledTitleDiv = styled.div`
    margin-bottom: 1rem;
    display: flex;
    margin-left: 28rem;
`

const ProductDiv = styled.div`
    margin-bottom: 1rem;
`

const StyledLabel = styled.label`
    margin-right: 1rem;
`

const StyledProductLabel = styled.label`
    margin-bottom: 0.5rem;
`

const StyledSpan = styled.span`
    margin-bottom: 0.6rem;
    margin-top: 1rem;
`

interface Props extends DropdownProps {
}

interface ArchiveFieldProps extends FormState {
}

interface State {
    productOptions: Array<DropdownOption>,
    selectedProductId?: number,
    isHotDeal: boolean,
    price?: number,
    hotDealPrice?: number,
    pageDataLoaded: boolean,
    saveSuccess: boolean,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class AddToArchiveView extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            productOptions: [],
            selectedProductId: undefined,
            isHotDeal: false,
            pageDataLoaded: false,
            saveSuccess: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        try {
            const products = await getAllProducts(this.state.cancelTokenSource);
            const productOptions = products.map(p => {
                return {
                    key: p.id,
                    text: `${p.brand} - ${p.code}`,
                    value: p.id
                }
            });

            this.setState({
                productOptions: productOptions
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

    handleChange = ({values}: ArchiveFieldProps, form: FormApi) => {
        if (!this.mounted) {
            return;
        }

        if (values.productId !== undefined) {
            this.onProductChange(values.productId)
        }
    }

    onProductChange = async (productId: number) => {
        const {cancelTokenSource} = this.state;
        const product = await findProductById(productId, cancelTokenSource);
        this.setState({
            selectedProductId: productId,
            isHotDeal: product.hotDeal,
            price: product.price,
            hotDealPrice: product.hotDealPrice
        })
    }

    handleError(error: any) {
        this.setErrorMessage("Something went wrong")
    }

    setErrorMessage = (errorMessage?: string) => {
        this.setState({
            errorMessage: errorMessage
        })
    };

    handleSubmit = async (values: Partial<UpsertArchiveDto>) => {

        let saveValues: Partial<UpsertArchiveDto> = {...values};

        const {cancelTokenSource} = this.state;

        const onSave = () => {
            if (saveValues) {
                this.setState({
                    saveSuccess: true
                })
            }
            setTimeout(() => {
                this.props.history.push('/archive');
            }, 2000);
        };

        await saveToArchive(saveValues, cancelTokenSource)
            .then(onSave)
            .catch(this.handleError)
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

    render(): React.ReactNode {

        return (
            <FinalForm
                onSubmit={(values) => this.handleSubmit(values)}
                subscription={{values: true, pristine: true, submitting: true}}
                render={this.renderForm}
            />
        );
    }

    renderForm = ({handleSubmit, submitting, form, values}: FormRenderProps): React.ReactNode => {

        const {
            selectedProductId,
            productOptions,
            isHotDeal,
            price,
            hotDealPrice,
            pageDataLoaded,
            saveSuccess,
            errorMessage
        } = this.state;

        return (
            <div>
                <div className="container" style={{fontSize: "large"}}>
                    <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "2rem"}}>Add to Archive</h1>
                    {!pageDataLoaded
                        ? this.renderLoader()
                        : <form onSubmit={handleSubmit}>
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
                                        <ProductDiv>
                                            <StyledProductLabel> Product: </StyledProductLabel>
                                            <Field
                                                name="productId"
                                                component={FinalFormSelectUI}
                                                options={productOptions}
                                                validate={required}
                                            />
                                        </ProductDiv>
                                    </div>
                                    {selectedProductId &&
                                    <StyledDiv>
                                        <div className="card col-md-12"
                                             style={{marginTop: "1rem", marginLeft: "6rem", border: "0px"}}>
                                            <FormDiv>
                                                <StyledLabel> Price: </StyledLabel>
                                                {isHotDeal
                                                    ? <>
                                                        <s style={{color: 'red'}}>{`${price}€`}</s>
                                                        <PxDiv> / </PxDiv>
                                                        <strong
                                                            style={{color: 'green'}}>{`${hotDealPrice}€`}</strong>
                                                    </>
                                                    : <strong>{`${price} €`}</strong>
                                                }
                                            </FormDiv>
                                            <FormDiv>
                                                <StyledLabel> Date: </StyledLabel>
                                                <Field
                                                    name="archivedDate"
                                                    component={DatePicker}
                                                    validate={required}
                                                    fluid
                                                    style={{width: "9.5rem", marginRight: "1rem"}}
                                                />
                                                <StyledLabel> Time: </StyledLabel>
                                                <Field
                                                    name="archivedTime"
                                                    component={Input}
                                                    validate={timeValidator}
                                                    onFocus={(value: any) => timeFormatOnFocus(value)}
                                                    format={(value: any) => timeInputFormat(value)}
                                                    formatOnBlur
                                                    fluid
                                                    style={{width: "5rem"}}
                                                />
                                            </FormDiv>
                                            <StyledTitleDiv>
                                                <StyledLabel> Remarks: </StyledLabel>
                                            </StyledTitleDiv>
                                            <FormDiv>
                                                <Field
                                                    name="remarks"
                                                    placeholder="Remarks..."
                                                    component={TextArea}
                                                    rows={4}
                                                    style={{width: "25rem"}}
                                                />
                                            </FormDiv>
                                        </div>
                                    </StyledDiv>}
                                    <StyledSpan>
                                        <Button compact type="Submit" primary
                                                disabled={submitting || !selectedProductId}>Save</Button>
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

export default AddToArchiveView