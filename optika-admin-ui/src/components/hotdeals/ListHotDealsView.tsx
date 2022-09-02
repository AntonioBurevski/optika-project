import {HotDealDto, HotDealSearchDto} from "../../ts-types/api.types";
import React, {Component} from "react";
import axios, {CancelTokenSource} from "axios";
import styled from "styled-components";
import {deleteHotDeal, getAllHotDeals, searchHotDeals} from "../../services/hotDealServices";
import GoToEditHotDeal from "../layout/routes/GotToEditHotDeal";
import GoToViewHotDeal from "../layout/routes/GoToViewHotDeal";
import GoToAddHotDeal from "../layout/routes/GoToAddHotDeal";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import moment from "moment";
import {errorUtils} from "../../utils/errorUtils";
import {Field, Form as FinalForm, FormSpy} from "react-final-form";
import CheckBox from "../layout/CheckBox";
import {debounce} from "ts-debounce";
import {FormState} from "final-form";
import DeleteActionButton from "../layout/buttons/DeleteActionButton";

const StyledDiv = styled.div`
  text-align: right;
  margin: 2rem;
`
const StyledSpan = styled.span`
  display: flex;
  align-items: baseline;
`
const SlashDiv = styled.div`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`

interface HotDealFieldProps extends FormState {
}

const initialHotDealSearch: Partial<HotDealSearchDto> = {};

interface Props {
}

interface State {
    foundHotDeals: Array<HotDealDto>;
    searchValues: Partial<HotDealSearchDto>;
    pageDataLoaded: boolean;
    errorMessage?: string;
    cancelTokenSource: CancelTokenSource;
}

class ListHotDealsView extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            foundHotDeals: [],
            searchValues: initialHotDealSearch,
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;

        try {
            const hotDeals = await getAllHotDeals(cancelTokenSource);
            this.setState({
                foundHotDeals: hotDeals
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

    fetchProducts = (values: any) => {

        const {cancelTokenSource} = this.state;
        this.setState({pageDataLoaded: false});

        const onFinally = () => {
            this.setState({
                pageDataLoaded: true
            })
        };

        searchHotDeals(values, cancelTokenSource)
            .then(response =>
                this.setState({
                    foundHotDeals: response,
                    searchValues: values
                })
            )
            .catch((error) => this.handleError(error.response.data))
            .finally(onFinally);
    }

    handleChange = debounce(({values}: HotDealFieldProps): void => {
        if (!this.mounted) {
            return;
        }
        this.fetchProducts(values);
    })

    deleteHotDeal = (id: number): void => {
        const {cancelTokenSource} = this.state;
        deleteHotDeal(id, cancelTokenSource)
            .then(response => {
                this.setState(({foundHotDeals}: State) => ({
                    foundHotDeals: foundHotDeals.filter(
                        (hotDeals: HotDealDto) => hotDeals.id !== response.id
                    )
                }))
                this.loadPageData();
            })
            .catch((error) => this.handleError(error.response.data))
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
                    active: true
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
                    <Icon name='fire' color='red' style={{marginLeft: "0.5rem"}}/>
                    Hot Deals
                </h1>
                <StyledDiv>
                            <StyledSpan>
                                <Field
                                    style={{marginLeft: "12rem", display: "flex", marginBottom: "2rem"}}
                                    label="Active"
                                    name="active"
                                    component={CheckBox}
                                    toggle
                                />
                            </StyledSpan>
                    <GoToAddHotDeal/>
                </StyledDiv>
                <FormSpy subscription={{values: true}} onChange={this.handleChange}/>
            </>
        )
    }

    renterTableSegment(): React.ReactNode {

        const {foundHotDeals, pageDataLoaded} = this.state;

        return (
            <div>
                {!pageDataLoaded
                    ? this.renderLoader()
                    : <div>
                        <div className="row" style={{marginLeft: "12rem"}}>
                            <table className="table table-hover table-responsive-xl">
                                <thead>
                                <tr style={{fontSize: "large"}}>
                                    <th> Product</th>
                                    <th> Old / New Price</th>
                                    <th> From Date</th>
                                    <th> To Date</th>
                                    <th> Active</th>
                                    <th> Actions</th>
                                    <th> Info</th>
                                </tr>
                                </thead>

                                <tbody style={{fontSize: "medium"}}>
                                {
                                    foundHotDeals.map(
                                        hotDeal =>
                                            <tr key={hotDeal.id}>
                                                <td> {hotDeal.productCode && hotDeal.productCode.includes("Deleted")
                                                    ? <div style={{color: "red"}}>{hotDeal.productCode}</div>
                                                    : <div>{hotDeal.productCode}</div>
                                                }
                                                </td>
                                                <td>
                                                    <span style={{display: "inline-flex"}}>
                                                        <s style={{color: 'red'}}>{hotDeal.oldPrice} €</s>
                                                        <SlashDiv> / </SlashDiv>
                                                        <div style={{color: 'green'}}>{hotDeal.newPrice} €</div>
                                                    </span>
                                                </td>
                                                <td> {moment(hotDeal.fromDate).format("DD.MM.YYYY")} </td>
                                                <td> {moment(hotDeal.toDate).format("DD.MM.YYYY")} </td>
                                                <td> {hotDeal.active
                                                    ? <Icon color={"green"} name={"check"}/>
                                                    : <Icon color={"red"} name={"close"}/>
                                                }
                                                </td>
                                                <td>
                                                    <GoToEditHotDeal hotDealId={hotDeal.id}/>
                                                    <DeleteActionButton
                                                        hoverMessage="Delete"
                                                        popupMessage="Are you sure you want to delete this hot deal?"
                                                        onConfirm={() => this.deleteHotDeal(hotDeal.id)}
                                                    />
                                                    {/*<Icon style={{marginLeft: "2px", cursor: 'pointer'}}*/}
                                                    {/*      onClick={() => this.deleteHotDeal(hotDeal.id)}*/}
                                                    {/*      size='large'*/}
                                                    {/*      color='red'*/}
                                                    {/*      name="cancel">*/}
                                                    {/*</Icon>*/}
                                                </td>
                                                <td>
                                                    <GoToViewHotDeal hotDealId={hotDeal.id}/>
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

export default ListHotDealsView