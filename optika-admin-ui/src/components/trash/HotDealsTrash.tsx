import {HotDealDto} from "../../ts-types/api.types";
import React, {Component} from "react";
import axios, {CancelTokenSource} from "axios";
import styled from "styled-components";
import {getHotDealsTrash, permanentlyDeleteHotDeal} from "../../services/trashServices";
import GoToViewHotDeal from "../layout/routes/GoToViewHotDeal";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import moment from "moment";

const StyledDiv = styled.div`
  text-align: right;
  margin: 2rem;
`

const SlashDiv = styled.div`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`

interface Props {
}

interface State {
    foundHotDeals: Array<HotDealDto>;
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
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;

        try {
            const hotDeals = await getHotDealsTrash(cancelTokenSource);
            this.setState({
                foundHotDeals: hotDeals
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

    permanentlyDeleteHotDeal = (id: number): void => {
        const {cancelTokenSource} = this.state;
        permanentlyDeleteHotDeal(id, cancelTokenSource).then(response => {
            this.setState(({foundHotDeals}: State) => ({
                foundHotDeals: foundHotDeals.filter(
                    (hotDeals: HotDealDto) => hotDeals.id !== response.id
                )
            }))
            this.loadPageData();
        }).catch(this.handleError)
    };

    render() {

        const {foundHotDeals, pageDataLoaded} = this.state;

        return (
            <div>
                <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                    <Icon.Group size='large' style={{marginRight: "0.5rem"}}>
                        <Icon name='trash alternate' color='grey'/>
                        <Icon corner="top right" name='fire' color='red'/>
                    </Icon.Group>
                    Hot Deals Trash
                </h1>

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
                                    <th> Permanently delete</th>
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
                                                <td>
                                                    <Icon style={{marginLeft: "2px", cursor: 'pointer'}}
                                                          onClick={() => this.permanentlyDeleteHotDeal(hotDeal.id)}
                                                          size='large'
                                                          color='red'
                                                          name="eraser">
                                                    </Icon>
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