import {ArchiveDto} from "../../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import React, {Component} from "react";
import {Dimmer, Icon, Loader} from "semantic-ui-react";
import moment from "moment";
import styled from "styled-components";
import GoToAddToArchive from "../layout/routes/GoToAddToArchive";
import GoToViewProduct from "../layout/routes/GoToViewProduct";
import {getArchiveTrash, permanentlyDeleteArchive} from "../../services/trashServices";
import {errorUtils} from "../../utils/errorUtils";

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
    foundArchives: Array<ArchiveDto>;
    pageDataLoaded: boolean;
    errorMessage?: string;
    cancelTokenSource: CancelTokenSource;
}

class ArchiveTrash extends Component<Props, State> {

    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);

        const cancelTokenSource = axios.CancelToken.source();

        this.state = {
            foundArchives: [],
            pageDataLoaded: false,
            cancelTokenSource
        }

        this.loadPageData();
    }

    loadPageData = async () => {
        const {cancelTokenSource} = this.state;

        try {
            const archives = await getArchiveTrash(cancelTokenSource);
            this.setState({
                foundArchives: archives
            });
        } catch (e: any) {
            this.handleError(e.response.data);
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
            errorUtils.unknownArchiveId,
            errorUtils.unknownProductId
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

    permanentlyDeleteArchive = (id: number): void => {
        const {cancelTokenSource} = this.state;
        permanentlyDeleteArchive(id, cancelTokenSource).then(response => {
            this.setState(({foundArchives}: State) => ({
                foundArchives: foundArchives.filter(
                    (archives: ArchiveDto) => archives.id !== response.id
                )
            }))
            this.loadPageData();
        }).catch(this.handleError)
    };

    render() {

        const {foundArchives, pageDataLoaded} = this.state;

        return (
            <div>
                <h1 className="text-center" style={{marginTop: "5rem", marginBottom: "4rem"}}>
                    <Icon.Group size='large' style={{marginRight: "0.5rem"}}>
                        <Icon name='trash alternate' color='grey'/>
                        <Icon corner="top right" name='folder open' color='brown'/>
                    </Icon.Group>
                    Archive Trash
                </h1>
                {!pageDataLoaded
                    ? this.renderLoader()
                    : <div>

                        <div className="row" style={{marginLeft: "12rem"}}>
                            <table className="table table-hover table-responsive-xl">
                                <thead>
                                <tr style={{fontSize: "large"}}>
                                    <th> Product</th>
                                    <th> Price</th>
                                    <th> Hot Deal</th>
                                    <th> Archived timestamp</th>
                                    <th> Permanently delete</th>
                                    <th> Info</th>
                                </tr>
                                </thead>

                                <tbody style={{fontSize: "medium"}}>
                                {
                                    foundArchives.map(
                                        archive =>
                                            <tr key={archive.id}>
                                                <td> {archive.productCode && archive.productCode.includes("Deleted")
                                                    ? <div style={{color: "red"}}>{archive.productCode}</div>
                                                    : <div>{archive.productCode}</div>
                                                }
                                                </td>
                                                <td> {archive.price} €</td>
                                                <td> {archive.hotDeal
                                                    ? <Icon color={"green"} name={"check"}/>
                                                    : <Icon color={"red"} name={"close"}/>
                                                }
                                                </td>
                                                <td>
                                                    {moment(archive.archivedDateTime).format("DD.MM.YYYY / HH:mm")}
                                                </td>
                                                <td>
                                                    <Icon style={{marginLeft: "2px", cursor: 'pointer'}}
                                                          onClick={() => this.permanentlyDeleteArchive(archive.id)}
                                                          size='large'
                                                          color='red'
                                                          name='eraser'>
                                                    </Icon>
                                                </td>
                                                <td>
                                                    <GoToViewProduct productId={archive.productId}/>
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

export default ArchiveTrash