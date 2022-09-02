import './App.css';
import React from "react";
import 'semantic-ui-css/semantic.min.css'
import {Route, Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom"
import './styles/VirtualizedTable.css'
import Header from "./components/layout/Header";
import Sidenav from "./components/layout/Sidenav";
import HomeComponent from "./components/HomeComponent";
import ListProductsView from "./components/products/ListProductsView";
import AddProductView from "./components/products/AddProductView";
import EditProductView from "./components/products/EditProductView";
import ProductDetailsView from "./components/products/ProductDetailsView";
import ListHotDealsView from "./components/hotdeals/ListHotDealsView";
import AddHotDealView from "./components/hotdeals/AddHotDealView";
import EditHotDealView from "./components/hotdeals/EditHotDealView";
import HotDealDetailsView from "./components/hotdeals/HotDealDetailsView";
import ListArchivesView from "./components/archive/ListArchivesView";
import AddToArchiveView from "./components/archive/AddToArchiveView";
import TrashHomeComponent from "./components/trash/TrashHomeComponent";
import ProductsTrash from "./components/trash/ProductsTrash";
import HotDealsTrash from "./components/trash/HotDealsTrash";
import ArchiveTrash from "./components/trash/ArchiveTrash";
import MakeProductHotDeal from "./components/products/MakeProductHotDeal";
import ArchiveDetailsView from "./components/archive/ArchiveDetailsView";
import ListCustomerContactView from "./components/customer-contact/ListCustomerContactView";
import CustomerContactTrash from "./components/trash/CustomerContactTrash";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Sidenav/>
                <Switch>
                    <Route exact path='/' component={HomeComponent}/>
                    <Route exact path="/products" component={ListProductsView}/>
                    <Route exact path="/add-product" component={AddProductView}/>
                    <Route exact path="/edit-product/:productId" component={EditProductView}/>
                    <Route exact path="/view-product/:productId" component={ProductDetailsView}/>
                    <Route exact path="/product/make-hot-deal/:productId" component={MakeProductHotDeal}/>
                    <Route exact path="/hot-deals" component={ListHotDealsView}/>
                    <Route exact path="/add-hot-deal" component={AddHotDealView}/>
                    <Route exact path="/edit-hot-deal/:hotDealId" component={EditHotDealView}/>
                    <Route exact path="/view-hot-deal/:hotDealId" component={HotDealDetailsView}/>
                    <Route exact path="/archive" component={ListArchivesView}/>
                    <Route exact path="/add-to-archive" component={AddToArchiveView}/>
                    <Route exact path="/view-archive/:archiveId" component={ArchiveDetailsView}/>
                    <Route exact path="/customer-contact" component={ListCustomerContactView}/>
                    <Route exact path="/trash" component={TrashHomeComponent}/>s
                    <Route exact path="/trash/products" component={ProductsTrash}/>
                    <Route exact path="/trash/hot-deals" component={HotDealsTrash}/>
                    <Route exact path="/trash/archive" component={ArchiveTrash}/>
                    <Route exact path="/trash/customer-contact" component={CustomerContactTrash}/>
                </Switch>
                {/*<Footer/>*/}
            </Router>
        </div>
    );
}

export default App;
