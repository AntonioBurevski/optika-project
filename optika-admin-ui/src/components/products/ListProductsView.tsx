import {ProductDto, ProductSearchDto} from "../../ts-types/api.types";
import React, {Component} from "react";
import {deleteProduct, getAllProducts, searchProducts} from "../../services/productServices";
import axios, {CancelTokenSource} from "axios";
import GoToAddProduct from "../layout/routes/GoToAddProduct";
import GoToViewProduct from "../layout/routes/GoToViewProduct";
import GoToEditProduct from "../layout/routes/GoToEditProduct";
import styled from "styled-components";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import {errorUtils} from "../../utils/errorUtils";
import CheckBox from "../layout/CheckBox";
import {Field, Form as FinalForm, FormSpy} from "react-final-form";
import {debounce} from "ts-debounce";
import {FormState} from "final-form";
import Input from "../layout/Input";
import DeleteActionButton from "../layout/buttons/DeleteActionButton";

const StyledDiv = styled.div`
  text-align: right;
  margin: 2rem;
`
const SlashDiv = styled.div`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`
const StyledSpan = styled.span`
  display: inline-flex;
  align-items: baseline;
  float: left;
  margin-left: 12rem;
`

interface ProductFieldProps extends FormState {
}

const initialProductSearch: Partial<ProductSearchDto> = {};

interface Props {
}

interface State {
    foundProducts: Array<ProductDto>;
    searchValues: Partial<ProductSearchDto>;
    errorMessage?: string;
    pageDataLoaded: boolean;
    cancelTokenSource: CancelTokenSource;
}

class ListProductsView extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            foundProducts: [],
            searchValues: initialProductSearch,
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;

        try {
            const products = await getAllProducts(cancelTokenSource);
            this.setState({
                foundProducts: products
            });
        } catch (e: any) {
            this.handleError(e.response.data)
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
        cancelTokenSource && cancelTokenSource.cancel('Operation canceled by user');
    }

    fetchProducts = (values: any) => {

        const {cancelTokenSource} = this.state;
        this.setState({pageDataLoaded: false});

        const onFinally = () => {
            this.setState({
                pageDataLoaded: true
            })
        };

        searchProducts(values, cancelTokenSource)
            .then(response =>
                this.setState({
                    foundProducts: response,
                    searchValues: values
                })
            )
            .catch((error) => this.handleError(error.response.data))
            .finally(onFinally);
    }

    handleChange = debounce(({values}: ProductFieldProps): void => {
        if (!this.mounted) {
            return;
        }
        this.fetchProducts(values);
    })

    handleError(error: any) {
        const errorCode = error.errorCode;
        const knownErrors: Array<string> = [
            errorUtils.unknownProductId,
            errorUtils.unknownHotDealId,
            errorUtils.unknownHotDealForProduct
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


    renderLoader = (): React.ReactNode => {

        return (
            <Dimmer active inverted>
                <Loader inline="centered" size="medium">
                    Loading...
                </Loader>
            </Dimmer>
        );
    };

    deleteProduct = (id: number): void => {
        const {cancelTokenSource} = this.state;
        deleteProduct(id, cancelTokenSource)
            .then(response => {
                this.setState(({foundProducts}: State) => ({
                    foundProducts: foundProducts.filter(
                        (products: ProductDto) => products.id !== response.id
                    )
                }));
                this.loadPageData();
            })
            .catch((error) => this.handleError(error.response.data))
    };

    render(): React.ReactNode {
        return (
            <>
                <div>
                    {this.renderTopSegment()}
                </div>
                <div>
                    {this.renterTableSegment()}
                </div>
            </>
        );
    }

    renderTopSegment = (): JSX.Element => {

        return (
            <FinalForm
                onSubmit={() => {
                }}
                initialValues={{
                    inStock: true
                }}
                subscription={{pristine: true}}
                render={this.renderTopSegmentForm}
            />
        );
    };

    renderTopSegmentForm = (): React.ReactNode => {
        return (
            <>
                <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                    <Icon name='th list' color='teal' style={{marginLeft: "0.5rem"}}/>
                    Products
                </h1>
                <StyledDiv>
                            <span>
                                <Field
                                    style={{marginLeft: "12rem", display: "flex", marginBottom: "2rem"}}
                                    label="In Stock"
                                    name="inStock"
                                    component={CheckBox}
                                    toggle
                                />
                                <StyledSpan>
                                    <label style={{fontSize: "large"}}>Code: </label>
                                    <Field
                                        style={{width: "8rem", marginLeft: "1rem"}}
                                        name="productSearchTerm"
                                        component={Input}
                                        fluid
                                    />
                                </StyledSpan>
                            </span>
                    <GoToAddProduct/>
                </StyledDiv>
                <FormSpy subscription={{values: true}} onChange={this.handleChange}/>
            </>
        )
    }

    renterTableSegment(): React.ReactNode {

        const {foundProducts, pageDataLoaded} = this.state;

        return (
            <div>
                {!pageDataLoaded
                    ? this.renderLoader()
                    : <div>
                        <div className="row" style={{marginLeft: "12rem"}}>
                            <table className="table table-hover table-responsive-xl">
                                <thead>
                                <tr style={{fontSize: "large"}}>
                                    <th> Brand</th>
                                    <th> Code</th>
                                    <th> Price</th>
                                    <th> Type</th>
                                    <th> In stock</th>
                                    <th> Actions</th>
                                    <th> Info</th>
                                </tr>
                                </thead>

                                <tbody style={{fontSize: "medium"}}>
                                {
                                    foundProducts.map(
                                        product =>
                                            <tr key={product.id}>
                                                <td> {product.brand} </td>
                                                <td> {product.code} </td>
                                                <td> {product.hotDeal
                                                    ? <span style={{display: "inline-flex"}}><s
                                                        style={{color: 'red'}}>{product.price} €</s>
                                                             <SlashDiv> / </SlashDiv>
                                                             <div
                                                                 style={{color: 'green'}}>{product.hotDealPrice} €</div>
                                                        </span>
                                                    : `${product.price} €`
                                                }
                                                </td>
                                                <td> {product.type} </td>
                                                <td> {product.inStock
                                                    ? <Icon color={"green"} name={"check"}/>
                                                    : <Icon color={"red"} name={"close"}/>
                                                }
                                                </td>
                                                <td>
                                                    <GoToEditProduct productId={product.id}/>
                                                    <DeleteActionButton
                                                        hoverMessage="Delete"
                                                        popupMessage="Are you sure you want to delete this product?"
                                                        onConfirm={() => this.deleteProduct(product.id)}
                                                    />
                                                    {/*<Icon style={{marginLeft: "2px", cursor: 'pointer'}}*/}
                                                    {/*      onClick={() => this.deleteProduct(product.id)}*/}
                                                    {/*      size='large'*/}
                                                    {/*      color='red'*/}
                                                    {/*      name="cancel">*/}
                                                    {/*</Icon>*/}
                                                </td>
                                                <td>
                                                    <GoToViewProduct productId={product.id}/>
                                                </td>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        );
    }

}

export default ListProductsView