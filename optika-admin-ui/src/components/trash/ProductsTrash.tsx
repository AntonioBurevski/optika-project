import {ProductDto} from "../../ts-types/api.types";
import React, {Component} from "react";
import axios, {CancelTokenSource} from "axios";
import GoToViewProduct from "../layout/routes/GoToViewProduct";
import styled from "styled-components";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import {getProductsTrash, permanentlyDeleteProduct, retrieveProduct} from "../../services/trashServices";
import GoToHotDealsTrash from "../layout/routes/home-routes/GoToHotDealsTrash";

interface Props {
}

interface State {
    foundProducts: Array<ProductDto>;
    pageDataLoaded: boolean;
    errorMessage?: string;
    cancelTokenSource: CancelTokenSource;
}

class ProductsTrash extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            foundProducts: [],
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;

        try {
            const products = await getProductsTrash(cancelTokenSource);
            this.setState({
                foundProducts: products
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
        cancelTokenSource && cancelTokenSource.cancel('Operation canceled by user');
    }

    handleError(error: any) {
        this.setErrorMessage("Something went wrong")
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

    retrieveProduct = (productId: number): void => {
        const {cancelTokenSource} = this.state;
        retrieveProduct(productId, cancelTokenSource).then(response => {
            this.setState(({foundProducts}: State) => ({
                foundProducts: foundProducts.filter(
                    (products: ProductDto) => products.id !== response.id
                )
            }))
            this.loadPageData();
        }).catch(this.handleError)
    };

    permanentlyDeleteProduct = (productId: number): void => {
        const {cancelTokenSource} = this.state;
        permanentlyDeleteProduct(productId, cancelTokenSource).then(response => {
            this.setState(({foundProducts}: State) => ({
                foundProducts: foundProducts.filter(
                    (products: ProductDto) => products.id !== response.id
                )
            }))
            this.loadPageData();
        }).catch(this.handleError)
    };

    render() {

        const {foundProducts, pageDataLoaded} = this.state;

        return (
            <div>
                <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                    <Icon.Group size='large' style={{marginRight: "0.5rem"}}>
                        <Icon name='trash alternate' color='grey'/>
                        <Icon corner="top right" name='th list' color='teal'/>
                    </Icon.Group>
                    Products Trash
                </h1>

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
                                    <th> Retrieve</th>
                                    <th> Permanently delete</th>
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
                                                <td> {`${product.price} €`}
                                                </td>
                                                <td> {product.type} </td>
                                                <td>
                                                    <Icon style={{marginLeft: "2px", cursor: 'pointer'}}
                                                          onClick={() => this.retrieveProduct(product.id)}
                                                          size='large'
                                                          color='green'
                                                          name="recycle">
                                                    </Icon>
                                                </td>
                                                <td>
                                                    <Icon style={{marginLeft: "2px", cursor: 'pointer'}}
                                                          onClick={() => this.permanentlyDeleteProduct(product.id)}
                                                          size='large'
                                                          color='red'
                                                          name="eraser">
                                                    </Icon>
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

export default ProductsTrash