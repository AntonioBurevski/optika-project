import axios, {CancelTokenSource} from "axios";
import React, {Component} from "react";
import {findProductById} from "../../services/clientCoreServices";
import {ProductCoreDto} from "../../ts-types/api.types";
import {Grid, Icon} from "semantic-ui-react";
import StyledErrorMessage from "./StyledErrorMessage";
import PxGrid from "./PxGrid";
import styled from "styled-components";
import moment from "moment";

const PxDiv = styled.div`
    margin-right: 1rem;
    margin-left: 1rem;
`

interface Props {
    productId?: number,
    onSave: () => void,
    onCancel: () => void,
}

interface State {
    product?: ProductCoreDto,
    errorMessage?: string,
    cancelTokenSource: CancelTokenSource
}

class ProductDetailsModal extends Component<Props, State> {

    cancelTokenSource = axios.CancelToken.source();

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            cancelTokenSource: cancelTokenSource
        };

        const productId = this.props.productId
        if (productId) {
            findProductById(productId, cancelTokenSource)
                .then(response => this.setState({product: response}))
                .catch(this.handleError)
        }
    }

    handleError(error: any) {
        const errorCode = error.errorCode;
        const knownErrors = [{}];

        const violations: Array<any> = error.violations;

        if (violations && violations.length > 0) {
            violations.forEach(violation => {
                if (knownErrors.includes(violation.errorCode)) {
                    this.setErrorMessage(`error.${violation.errorCode}`)
                }
            });
        } else {
            if (knownErrors.includes(errorCode)) {
                this.setErrorMessage(errorCode)
            } else {
                this.setErrorMessage('Something went wrong');
            }
        }
    }

    setErrorMessage = (errorMessage?: string) => {
        this.setState({
            errorMessage: errorMessage
        })
    };

    render(): React.ReactNode {

        const {onCancel} = this.props;
        const {product, errorMessage} = this.state;

        return (
            <PxGrid style={{fontSize: '1.2rem'}}>
                {errorMessage &&
                <Grid.Row>
                    <Grid.Column width={16}>
                        <StyledErrorMessage onDismiss={() => this.setErrorMessage(undefined)}>
                            {errorMessage}
                        </StyledErrorMessage>
                    </Grid.Column>
                </Grid.Row>
                }
                {product &&
                <>
                    <Grid.Row>
                        <Grid.Column width={4}>In Stock:</Grid.Column>
                        <Grid.Column width={12}><Icon color={'green'} name={'check'}/></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>Product: </Grid.Column>
                        <Grid.Column width={12} style={{display: 'flex'}}>
                            <strong>{product.brand} {product.code}</strong>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>Type: </Grid.Column>
                        <Grid.Column width={12} style={{display: 'inline-flex'}}>
                            <strong style={{marginRight: '0.5rem'}}>{product.type}</strong>
                            {product.polarized &&
                            <>
                                (
                                <div style={{color: 'forestgreen'}}>Polarized</div>
                                )
                            </>}
                            {product.photoGray &&
                            <>
                                (
                                <div style={{color: 'forestgreen'}}>PhotoGray</div>
                                )
                            </>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>Category: </Grid.Column>
                        <Grid.Column width={12}><strong>{product.category}</strong></Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        {product.hotDeal
                            ? <>
                                <Grid.Column width={4}>Price: </Grid.Column>
                                <Grid.Column width={12}>
                                    <span style={{display: 'flex'}}>
                                        <s style={{color: 'red'}}>{`${product.price}€`}</s>
                                        <PxDiv> / </PxDiv>
                                        <strong style={{color: 'green'}}>{`${product.newPrice}€`}</strong>
                                    </span>
                                    <span style={{display: 'flex', fontWeight: 600}}>
                                        {moment(product.fromDate).format('MMM, DD YYYY')}
                                        <PxDiv> - </PxDiv>
                                        {moment(product.toDate).format('MMM, DD YYYY')}
                                    </span>
                                </Grid.Column>
                            </>
                            : <>
                                <Grid.Column width={4}>Price:</Grid.Column>
                                <Grid.Column width={12}><strong>{product.price}€</strong></Grid.Column>
                            </>
                        }
                        {product.description &&
                        <Grid.Row>
                            <Grid.Column width={16} style={{marginTop: '2rem', marginLeft: '1rem'}}>
                                <i>{product.description}</i>
                            </Grid.Column>
                        </Grid.Row>
                        }
                    </Grid.Row>
                </>
                }
            </PxGrid>
        );
    }

}

export default ProductDetailsModal;