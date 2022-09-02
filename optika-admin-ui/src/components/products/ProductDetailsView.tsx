import React, {Component} from "react";
import {ProductDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import {findProductById} from "../../services/productServices";
import StyledErrorMessage from "../layout/StyledErrorMessage";
import {RouteComponentProps} from "react-router";
import {ProductType} from "../../ts-types/api.enums";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import styled from "styled-components";

const StyledImg = styled.img`
    width: 20rem;
    height: 15rem;
`

interface RouteParams {
    productId?: string
}

interface Props extends RouteComponentProps<RouteParams> {
}

interface State {
    product?: ProductDto,
    pageDataLoaded: boolean,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class ProductDetailsView extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        // const productId = Number(this.props.match.params.productId);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;
        const productId = Number(this.props.match.params.productId);

        try {
            const product = await findProductById(productId, cancelTokenSource);
            this.setState({
                product: product
            });
        } finally {
            this.setState({
                pageDataLoaded: true
            })
        }
    }

    handleError(error: any) {
        this.setErrorMessage("Something went wrong")
    }

    setErrorMessage = (errorMessage?: string) => {
        this.setState({
            errorMessage: errorMessage
        })
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
        const {product, pageDataLoaded, errorMessage} = this.state;

        return (
            <div>
                <div className="container" style={{fontSize: "large"}}>
                    <span>
                        <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                        <Icon name='arrow alternate circle left' color='blue'
                              style={{cursor: 'pointer', textAlign: 'left'}}
                              onClick={() => this.goToPreviousPage()}/>
                            Details
                        </h1>
                    </span>
                    {!pageDataLoaded && this.renderLoader()}
                    {product && pageDataLoaded &&
                    <div className="row">
                        <div className="card col-md-5" style={{marginTop: "2rem", marginLeft: "6rem", border: "0px"}}>
                            <div className="card-body" style={{marginLeft: "20rem"}}>
                                {errorMessage
                                && (
                                    <StyledErrorMessage onDismiss={() => this.setErrorMessage()}>
                                        {errorMessage}
                                    </StyledErrorMessage>
                                )
                                }
                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "1rem"}}> In Stock: </label>
                                    <span>{product.inStock
                                        ? <Icon color={"green"} name={"check"}/>
                                        : <Icon color={"red"} name={"close"}/>
                                    }
                                    </span>
                                </div>
                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.6rem"}}> Hot Deal: </label>
                                    <span>{product.hotDeal
                                        ? <Icon color={"green"} name={"check"}/>
                                        : <Icon color={"red"} name={"close"}/>
                                    }
                                    </span>
                                </div>

                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> Code: </label>
                                    <div><strong>{product.code}</strong></div>
                                </div>

                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> Brand: </label>
                                    <div><strong>{product.brand}</strong></div>
                                </div>

                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> Price: </label>
                                    {product.hotDeal ?
                                        <>
                                            <s style={{color: 'red'}}>{product.price} € </s>
                                            <div style={{marginRight: "0.5rem", marginLeft: "0.5rem"}}> /</div>
                                            <strong style={{color: 'green'}}>{product.hotDealPrice} €</strong>
                                        </>
                                        : <div><strong>{product.price} €</strong></div>
                                    }
                                </div>

                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> Type: </label>
                                    <div><strong>{product.type}</strong></div>
                                </div>
                            </div>
                        </div>

                        {(product.type === ProductType.FRAMES || product.type === ProductType.SUNGLASSES)
                        &&
                        <div className="card col-md-5" style={{marginTop: "2rem", marginLeft: "6rem", border: "0px"}}>
                            <div className="card-body">

                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> Category: </label>
                                    <div><strong>{product.category}</strong></div>
                                </div>

                                {product.type === ProductType.SUNGLASSES &&
                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> Polarized: </label>
                                    <span>{product.polarized
                                        ? <Icon color={"green"} name={"check"}/>
                                        : <Icon color={"red"} name={"close"}/>
                                    }
                                    </span>
                                </div>
                                }

                                {product.type !== ProductType.SUNGLASSES &&
                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <label style={{marginRight: "0.5rem"}}> PhotoGray: </label>
                                    <span>{product.photoGray
                                        ? <Icon color={"green"} name={"check"}/>
                                        : <Icon color={"red"} name={"close"}/>
                                    }
                                    </span>
                                </div>
                                }

                                <div className="form-group" style={{marginBottom: "0.5rem", display: "flex"}}>
                                    <label> Description: </label>
                                </div>
                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <div><em>{product.description}</em></div>
                                </div>
                            </div>
                        </div>
                        }
                        {product.type !== ProductType.FRAMES && product.type !== ProductType.SUNGLASSES
                        &&
                        <div className="card col-md-5" style={{marginTop: "2rem", marginLeft: "6rem", border: "0px"}}>
                            <div className="card-body">
                                <div className="form-group" style={{marginBottom: "0.5rem", display: "flex"}}>
                                    <label> Description: </label>
                                </div>
                                <div className="form-group" style={{marginBottom: "1.5rem", display: "flex"}}>
                                    <div><em>{product.description}</em></div>
                                </div>
                            </div>
                        </div>
                        }
                        {product.image
                            ? <div className="form-group" style={{marginBottom: "1.5rem"}}>
                                <StyledImg src={`data:image/*;base64,${product.image}`}/>
                            </div>
                            : <div className="form-group" style={{marginBottom: "1.5rem"}}>
                                <i>No image available.</i>
                            </div>
                        }
                    </div>

                    }
                </div>
            </div>
        )
    }
}

export default ProductDetailsView