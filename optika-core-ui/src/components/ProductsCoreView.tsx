import {FormState} from "final-form";
import React, {useState} from "react";
import {isKeyCheck, useAfterFirstRender} from "./utils/coreUtils";
import {debounce} from "ts-debounce";
import _ from "lodash";
import {Field, Form as FinalForm, FormRenderProps, FormSpy} from 'react-final-form';
import {searchProducts} from "../services/clientCoreServices";
import axios from "axios";
import StyledErrorMessage from "./layout/StyledErrorMessage";
import Input from "./layout/Input";
import {Button, Grid, Icon, Loader, Modal} from "semantic-ui-react";
import {CategoryEx, ProductOrderBy, ProductTypeEx} from "../ts-types/api.enums";
import {HeroBtn, HeroContent, HeroH1, HeroItems, HeroP, ProductsHeroContainer} from "./layout/HeroElements";
import FormModalContentContainer from "./layout/FormModelContentContainer";
import ContactModal from "./ContactModal";
import PxGrid from "./layout/PxGrid";
import FinalFormSelectUI from "./layout/Select";
import CheckBox from "./layout/CheckBox";
import {ProductCoreSearchRequest, ProductCoreSearchResult} from "./utils/apiTypes";
import {
    FoundProductsHeading,
    ProductCard,
    ProductContainer,
    ProductImg,
    ProductInfo,
    ProductOutOfStock,
    ProductPrice,
    ProductTitle,
    ProductWrapper,
    ViewButton
} from "./layout/CoreElements";
import styled from "styled-components";
import ProductDetailsModal from "./layout/ProductDetailsModal";
import moment from "moment";
import {HotDealDate} from "./layout/HotDealElements";

const PxDiv = styled.div`
    margin-right: 1rem;
    margin-left: 1rem;
`

interface ProductFieldProps extends FormState {
    values: Partial<ProductCoreSearchRequest>;
}

interface Props {
}

const cancelTokenSource = axios.CancelToken.source();

const ProductsCoreView = (props: Props) => {

    const [foundProducts, setFoundProducts] = useState<ProductCoreSearchResult[]>([]);
    const [productsLoaded, setProductsLoaded] = useState<boolean>(true);
    const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);
    const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
    const [contactsModalOpen, setContactsModalOpen] = useState<boolean>(false);
    const [searchValues, setSearchValues] = useState<Partial<ProductCoreSearchRequest>>({
        searchKey: '',
        type: ProductTypeEx.ALL,
        orderBy: ProductOrderBy.PRICE_DESCENDING,
        category: CategoryEx.ALL,
        inStock: true,
        hotDeal: false,
    });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const typeOptions = Object.keys(ProductTypeEx).map(value => {
        return {
            key: value,
            text: value,
            value: value
        }
    });

    const categoryOptions = Object.keys(CategoryEx).map(value => {
        return {
            key: value,
            text: value,
            value: value
        }
    });

    const orderByOptions = Object.keys(ProductOrderBy).map(value => {
        return {
            key: value,
            text: value,
            value: value
        }
    });

    React.useEffect(() => {
        // @ts-ignore
        document.getElementById("hero-products").focus();

        fetchData();
    }, []);

    const onQueryKeyDown = (event: any) => {
        event.persist();
        const isKey: any = isKeyCheck(event);

        if (isKey.enter) {
            fetchData();
        }
    };

    const handleChange = useAfterFirstRender(({values}: ProductFieldProps): void => {
        setSearchValues(values);
    });

    const fetchData = debounce((): void => {
        const onFinally = () => {
            setProductsLoaded(true);
        };

        setProductsLoaded(false);
        setFoundProducts([]);

        let newSearchValues = {...searchValues};
        if (_.isEmpty(newSearchValues)) {
            newSearchValues = {
                searchKey: ''
            };
        }

        searchProducts(newSearchValues, cancelTokenSource)
            .then(response => {
                    setFoundProducts(response);
                },
            )
            .catch((e: any) => handleError(e.response.data))
            .finally(onFinally)
    }, 300)

    const handleError = (error: any) => {
        if (error) {
            const errorCode = error.errorCode;
            const knownErrors: Array<string> = [];
            const violations: Array<any> = error.violations;
            if (violations && violations.length > 0) {
                violations.forEach(violation => {
                    if (knownErrors.includes(violation.errorCode)) {
                        setErrorMessage(violation.errorCode);
                    }
                });
            }
            if (!errorMessages.length) {
                if (knownErrors.includes(errorCode)) {
                    setErrorMessage(errorCode);
                } else {
                    setErrorMessage(error.general);
                }
            }
        }
    };

    const setErrorMessage = (errorMessage?: string) => {
        if (errorMessage) {
            const errMsgs = [...errorMessages];
            errMsgs.push(errorMessage);
            setErrorMessages(errMsgs);
        } else {
            setErrorMessages([]);
        }
    };

    const renderFinalForm = (): React.ReactNode => {
        return (
            <FinalForm
                onSubmit={() => {
                }}
                initialValues={{
                    searchKey: '',
                    type: ProductTypeEx.ALL,
                    category: CategoryEx.ALL,
                    inStock: true,
                    hotDeal: false,
                    orderBy: ProductOrderBy.PRICE_DESCENDING
                }}
                subscription={{pristine: true}}
                render={renderSearchProduct}
            />
        );
    };

    const renderHeroSegment = () => {
        return (
            <ProductsHeroContainer>
                <HeroContent id="hero-products">
                    <HeroItems>
                        <h1 style={{color: 'red'}}>summer sales!</h1>
                        <HeroH1>Products</HeroH1>
                        <HeroP>Up to 40% off!</HeroP>
                        <HeroBtn onClick={() => showContactModal()}>Contact us</HeroBtn>
                        <span style={{display: 'inline-flex', paddingTop: '5rem', opacity: 0.7}}>
                            <p style={{marginRight: '0.5rem'}}>see our offers below</p>
                            <Icon
                                name={'arrow alternate circle down'}
                                size={'large'}
                                color={'yellow'}
                                style={{marginBottom: '0.3rem'}}
                            />
                        </span>
                    </HeroItems>
                </HeroContent>
            </ProductsHeroContainer>
        )
    }


    const renderSearchProduct = ({form}: FormRenderProps): React.ReactNode => {

        return (
            <>
                {errorMessages.length > 0 &&
                <div className='error'>
                    <StyledErrorMessage onDismiss={() => setErrorMessage()}>
                        {errorMessages.map((err: string) => <div key={err}>{err}</div>)}
                    </StyledErrorMessage>
                </div>
                }
                <PxGrid style={{margin: '2rem 2rem 2rem 4rem'}}>
                    <Grid.Row>
                        <Grid.Column width={5} textAlign={"left"}>
                            <h1>Search our products</h1>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={2} textAlign={"left"}>
                            <Field
                                label='In Stock'
                                id='inStock'
                                name='inStock'
                                component={CheckBox}
                                toggle
                            />
                        </Grid.Column>
                        <Grid.Column width={2} textAlign={"left"}>
                            <Field
                                label='Hot Deal'
                                id='hotDeal'
                                name='hotDeal'
                                component={CheckBox}
                                toggle
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={1} textAlign={"left"}>Type:</Grid.Column>
                        <Grid.Column width={3} textAlign={"left"}>
                            <Field
                                id='type'
                                name='type'
                                component={FinalFormSelectUI}
                                options={typeOptions}
                                fluid
                            />
                        </Grid.Column>
                        <Grid.Column width={1} textAlign={"left"}>Category:</Grid.Column>
                        <Grid.Column width={3} textAlign={"left"}>
                            <Field
                                id='category'
                                name='category'
                                component={FinalFormSelectUI}
                                options={categoryOptions}
                                fluid
                            />
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column width={1} textAlign={"left"}><label>Search:</label></Grid.Column>
                        <Grid.Column width={2}>
                            <Field
                                id='searchKey'
                                name='searchKey'
                                component={Input}
                                onKeyDown={(e: any) => onQueryKeyDown(e)}
                                // autoFocus
                                fluid
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={1} textAlign={"left"}><label>Order by:</label></Grid.Column>
                        <Grid.Column width={3} textAlign={"left"}>
                            <Field
                                id='orderBy'
                                name='orderBy'
                                component={FinalFormSelectUI}
                                options={orderByOptions}
                                fluid
                            />
                        </Grid.Column>

                        <Grid.Column verticalAlign={"middle"}>
                            <Button
                                type='button'
                                className='action-button'
                                size='medium'
                                primary
                                compact
                                onClick={() => fetchData()}
                            >
                                Search
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </PxGrid>
                <FormSpy subscription={{values: true}} onChange={handleChange}/>
            </>
        )
    }

    const renderProductsSegment = () => {

        return (
            <ProductContainer>
                <FoundProductsHeading>
                    Found products ({foundProducts.length})
                </FoundProductsHeading>
                <ProductWrapper>
                    {foundProducts &&
                    foundProducts.map((product, index) => {
                        return (
                            <ProductCard key={index}>
                                <ProductImg src={`data:image/*;base64,${product.image}`} alt={product.imageName}/>
                                <ProductInfo>
                                    <ProductTitle><strong>{product.brand} {product.code}</strong></ProductTitle>
                                    {!product.inStock &&
                                    <ProductOutOfStock><i>Currently out of stock.</i></ProductOutOfStock>
                                    }
                                    {product.hotDeal &&
                                    <>
                                        <ProductPrice>
                                            <s style={{color: 'red'}}>{`${product.price}€`}</s>
                                            <PxDiv> /</PxDiv>
                                            <strong style={{color: 'green'}}>{`${product.newPrice}€`}</strong>
                                        </ProductPrice>
                                        <HotDealDate>
                                            {moment(product.fromDate).format("MMM, DD YYYY")}
                                            <PxDiv>-</PxDiv>
                                            {moment(product.toDate).format("MMM, DD YYYY")}
                                        </HotDealDate>
                                    </>
                                    }
                                    {!product.hotDeal &&
                                    <ProductPrice><strong>{product.price}€</strong></ProductPrice>
                                    }
                                    <ViewButton onClick={() => showProductDetailsModal(product.id)}>View</ViewButton>
                                </ProductInfo>
                            </ProductCard>
                        );
                    })}
                </ProductWrapper>
            </ProductContainer>
        );
    };

    const showProductDetailsModal = (productId: number) => {
        setDetailsModalOpen(true);
        setSelectedProductId(productId)
    };

    const hideProductDetailsModal = () => {
        setDetailsModalOpen(false);
    };

    const renderProductDetailsModal = (): React.ReactNode => {

        return (
            <Modal style={{position: 'sticky', height: 'fit-content', width: '30rem', fontFamily: "sans-serif"}}
                   open={detailsModalOpen} closeOnDimmerClick={true} onClose={() => hideProductDetailsModal()}>
                <Modal.Header style={{textAlign: 'left'}}>Product Details</Modal.Header>
                <FormModalContentContainer>
                    <ProductDetailsModal
                        productId={selectedProductId}
                        onSave={hideProductDetailsModal}
                        onCancel={hideProductDetailsModal}
                    />
                </FormModalContentContainer>
            </Modal>
        );
    };

    const showContactModal = () => {
        setContactsModalOpen(true);
    };

    const hideContactModal = () => {
        setContactsModalOpen(false);
    };

    const renderContactModal = (): React.ReactNode => {

        return (
            <Modal style={{position: 'sticky', height: 'fit-content', width: '30rem', fontFamily: "sans-serif"}}
                   open={contactsModalOpen} closeOnDimmerClick={true} onClose={() => hideContactModal()}>
                <Modal.Header>Contact us</Modal.Header>
                <FormModalContentContainer>
                    <ContactModal
                        onSave={hideContactModal}
                        onCancel={hideContactModal}
                    />
                </FormModalContentContainer>
            </Modal>
        );
    };

    return (
        <>
            {renderHeroSegment()}
            <div style={{backgroundColor: '#D3E4F8', overflow: 'auto'}}>
                {renderFinalForm()}
            </div>
            {productsLoaded && renderProductsSegment()}
            {!productsLoaded &&
            <Loader active inline content='Loading'/>}
            {renderProductDetailsModal()}
            {renderContactModal()}
        </>
    );
}

export default ProductsCoreView