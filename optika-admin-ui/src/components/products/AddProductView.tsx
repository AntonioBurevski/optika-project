import React, {Component} from "react";
import {Field, Form as FinalForm, FormRenderProps, FormSpy} from "react-final-form";
import CheckBox from "../layout/CheckBox";
import {UpsertProductDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import {addProduct} from "../../services/productServices";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import Input from "../layout/Input";
import {Button, Dimmer, DropdownProps, Loader, Message} from "semantic-ui-react";
import {Category, ProductType} from "../../ts-types/api.enums";
import {
    composeValidators,
    DropdownOption,
    mustBeNumber,
    mustBePositiveNumber,
    required
} from "../../utils/funcionUtils";
import FinalFormSelectUI from "../layout/Select";
import BackButton from "../layout/buttons/BackButton";
import {FormApi, FormState} from "final-form";
import {debounce} from "ts-debounce";
import TextArea from "../layout/TextArea";
import styled from "styled-components";
import DropZone from "../layout/dropzone/DropZone";
import {FileRejection} from "react-dropzone";

const StyledDiv = styled.div`
    display: flex;
`

const MsgDiv = styled.div`
    width: 70rem;
    margin-left: 15rem;
`

const StyledSpan = styled.span`
    margin-bottom: 0.6rem;
`

const StyledLabel = styled.label`
    margin-bottom: 0.8rem;
`

const FormDiv = styled.div`
    margin-bottom: 1rem;
`

const FormStyledDiv = styled.div`
    margin-bottom: 2rem;
`

const ExFormStyledDiv = styled.div`
    margin-top: 5rem;
    margin-bottom: 3rem;
`

const CategoryDiv = styled.div`
    margin-bottom: 1rem; 
    margin-top: 1rem;
`

interface Props extends DropdownProps {
}

interface ProductFieldProps extends FormState {
}

interface State {
    typeOptions: Array<DropdownOption>,
    categoryOptions: Array<DropdownOption>,
    selectedProductType?: ProductType,
    pageDataLoaded: boolean,
    saveSuccess: boolean,
    errorMessages?: string[],
    cancelTokenSource: CancelTokenSource
}

class AddProductView extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        const typeOptions = Object.keys(ProductType).map(value => {
            return {
                key: value,
                text: value,
                value: value
            }
        });

        const categoryOptions = Object.keys(Category).map(value => {
            return {
                key: value,
                text: value,
                value: value
            }
        });

        this.state = {
            typeOptions: typeOptions,
            categoryOptions: categoryOptions,
            selectedProductType: undefined,
            saveSuccess: false,
            pageDataLoaded: true,
            cancelTokenSource
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

    handleChange = debounce(({values}: ProductFieldProps, form: FormApi): void => {
        if (!this.mounted) {
            return;
        }

        if (values.type !== undefined) {
            this.setState({
                selectedProductType: values.type
            })
        }
    })

    onDropAccepted = (acceptedFiles: File[], form: FormApi) => {
        console.log(acceptedFiles[0])
        form.change("file", acceptedFiles[0]);
    };

    onDropRejected = (rejections: FileRejection[]) => {
        console.log(rejections, "FILE REJECTIONS");
    };

    handleError = (error: any) => {
        const {errorMessages} = this.state;

        if (error) {
            const errorCode = error.errorCode;
            const knownErrors: Array<string> = [];

            const violations: Array<any> = error.violations;

            if (violations && violations.length > 0) {
                violations.forEach(violation => {
                    if (knownErrors.includes(violation.errorCode)) {
                        this.setErrorMessage(`error.${violation.errorCode}`);
                    }
                });
            }

            if (errorMessages && !errorMessages.length) {
                if (knownErrors.includes(errorCode)) {
                    this.setErrorMessage(`error.${errorCode}`);
                } else {
                    this.setErrorMessage('error.general');
                }
            }
        }
    };

    setErrorMessage = (errorMessage?: string) => {
        const {errorMessages} = this.state;

        if (errorMessage && errorMessages) {
            const errMsgs = [...errorMessages]
            errMsgs.push(errorMessage)
            this.setState({
                errorMessages: errMsgs
            })
        } else {
            this.setState({
                errorMessages: []
            })
        }
    };

    handleSubmit = async (values: Partial<UpsertProductDto>) => {

        let saveValues: Partial<UpsertProductDto> = {...values};

        const {cancelTokenSource} = this.state;

        const onSave = () => {
            if (saveValues) {
                this.setState({
                    saveSuccess: true
                })
            }
            setTimeout(() => {
                this.props.history.push('/products');
            }, 2000);
        };

        await addProduct(saveValues, cancelTokenSource)
            .then(onSave)
            .catch((e: any) => this.handleError(e.response.data))
    };

    goToPreviousPage = () => {
        this.props.history.push("/products")
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
            pageDataLoaded,
            typeOptions,
            categoryOptions,
            selectedProductType,
            saveSuccess,
            errorMessages
        } = this.state;

        const validatePrice = composeValidators(mustBeNumber, mustBePositiveNumber);

        const uploadMessage = values.file ? values.file.name : "Click to upload image...";

        return (
            <div>
                <div className="container" style={{fontSize: "large"}}>
                    <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>Add Product</h1>
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
                            {errorMessages && errorMessages.length > 0
                            && (
                                <StyledErrorMessage onDismiss={() => this.setErrorMessage()}>
                                    {errorMessages.map((err:string) => <div key={err}>{err}</div>)}
                                </StyledErrorMessage>
                            )
                            }
                            <StyledDiv>
                                <div className="card col-md-5"
                                     style={{marginTop: "2rem", marginLeft: "6rem", border: "0px"}}>
                                    <div className="card-body">
                                        <FormStyledDiv>
                                            <Field
                                                label="In Stock"
                                                name="inStock"
                                                component={CheckBox}
                                                toggle
                                            />
                                        </FormStyledDiv>
                                        <FormDiv>
                                            <StyledLabel> Code: </StyledLabel>
                                            <Field
                                                name="code"
                                                placeholder="####"
                                                component={Input}
                                                validate={required}
                                            />
                                        </FormDiv>
                                        <FormDiv>
                                            <StyledLabel> Brand: </StyledLabel>
                                            <Field
                                                name="brand"
                                                placeholder="ex.RAY-BAN..."
                                                component={Input}
                                                validate={required}
                                            />
                                        </FormDiv>
                                        <FormDiv>
                                            <StyledLabel> Price: </StyledLabel>
                                            <Field
                                                name="price"
                                                placeholder="€€"
                                                component={Input}
                                                validate={required || validatePrice}
                                            />
                                        </FormDiv>
                                        <FormStyledDiv>
                                            <StyledLabel> Type: </StyledLabel>
                                            <Field
                                                name="type"
                                                component={FinalFormSelectUI}
                                                options={typeOptions}
                                                validate={required}
                                            />
                                        </FormStyledDiv>
                                    </div>
                                </div>
                                {
                                    selectedProductType &&
                                    (selectedProductType === ProductType.FRAMES || selectedProductType === ProductType.SUNGLASSES)
                                    &&
                                    <div className="card col-md-5"
                                         style={{marginTop: "2rem", marginLeft: "2rem", border: "0px"}}>


                                        <DropZone
                                            multiple={false}
                                            accept={'image/*'}
                                            message={uploadMessage}
                                            onDropAccepted={(acceptedFiles: File[]) => this.onDropAccepted(acceptedFiles, form)}
                                            onDropRejected={this.onDropRejected}
                                        />

                                        <CategoryDiv>
                                            <StyledLabel> Category: </StyledLabel>
                                            <Field
                                                name="category"
                                                component={FinalFormSelectUI}
                                                options={categoryOptions}
                                            />
                                        </CategoryDiv>

                                        {values.type === ProductType.SUNGLASSES &&
                                        <FormStyledDiv>
                                            <Field
                                                label="Polarized"
                                                name="polarized"
                                                component={CheckBox}
                                                toggle
                                            />
                                        </FormStyledDiv>
                                        }

                                        {values.type === ProductType.FRAMES &&
                                        <FormStyledDiv>
                                            <Field
                                                label="PhotoGray"
                                                name="photoGray"
                                                component={CheckBox}
                                                toggle
                                            />
                                        </FormStyledDiv>
                                        }

                                        <FormStyledDiv>
                                            <StyledLabel> Description: </StyledLabel>
                                            <Field
                                                name="description"
                                                placeholder="Description..."
                                                component={TextArea}
                                                rows={4}
                                            />
                                        </FormStyledDiv>
                                        <StyledSpan>
                                            <Button compact type="Submit" primary disabled={submitting || !values.file}>
                                                Save
                                            </Button>
                                            <BackButton onBack={() => this.goToPreviousPage()}/>
                                        </StyledSpan>
                                    </div>
                                }

                                {
                                    selectedProductType &&
                                    (selectedProductType !== ProductType.FRAMES && selectedProductType !== ProductType.SUNGLASSES)
                                    &&
                                    <div className="card col-md-5"
                                         style={{marginTop: "2rem", marginLeft: "2rem", border: "0px"}}>

                                        <DropZone
                                            multiple={false}
                                            accept={'image/*'}
                                            message={uploadMessage}
                                            onDropAccepted={(acceptedFiles: File[]) => this.onDropAccepted(acceptedFiles, form)}
                                            onDropRejected={this.onDropRejected}
                                        />

                                        <ExFormStyledDiv>
                                            <StyledLabel> Description: </StyledLabel>
                                            <Field
                                                name="description"
                                                placeholder="Description..."
                                                component={TextArea}
                                                rows={4}
                                            />
                                        </ExFormStyledDiv>

                                        <span>
                                    <Button compact type="Submit" primary disabled={submitting || !values.file}>
                                        Save
                                    </Button>
                                    <BackButton onBack={() => this.goToPreviousPage()}/>
                                </span>
                                    </div>
                                }
                            </StyledDiv>
                        </form>
                    }
                </div>
                <FormSpy subscription={{values: true}} onChange={formState => this.handleChange(formState, form)}/>
            </div>
        )
    }
}

export default AddProductView