import axios, {CancelTokenSource} from 'axios';
import {ArchiveDto, CustomerContactDto, HotDealDto, ProductDto} from "../ts-types/api.types";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const apiUri = `/api/trash`;

export const getProductsTrash = (
    source: CancelTokenSource): Promise<Array<ProductDto>> => {

    return axios
        .get(`${apiUri}/products/`, { cancelToken: source.token })
        .then(response => response.data);
};

export const getHotDealsTrash = (
    source: CancelTokenSource): Promise<Array<HotDealDto>> => {

    return axios
        .get(`${apiUri}/hot-deals/`, { cancelToken: source.token })
        .then(response => response.data);
};

export const getArchiveTrash = (
    source: CancelTokenSource): Promise<Array<ArchiveDto>> => {

    return axios
        .get(`${apiUri}/archive/`, { cancelToken: source.token })
        .then(response => response.data);
};

export const getCustomerContactTrash = (
    source: CancelTokenSource): Promise<Array<CustomerContactDto>> => {

    return axios
        .get(`${apiUri}/customer-contact/`, { cancelToken: source.token })
        .then(response => response.data);
};

export const permanentlyDeleteProduct = (
    productId: number, source: CancelTokenSource): Promise<ProductDto> => {

    return axios
        .delete(`${apiUri}/products/${productId}`, {cancelToken: source.token})
        .then(response => response.data);
};

export const permanentlyDeleteHotDeal = (
    hotDealId: number, source: CancelTokenSource): Promise<HotDealDto> => {

    return axios
        .delete(`${apiUri}/hotDeals/${hotDealId}`, {cancelToken: source.token})
        .then(response => response.data);
};

export const permanentlyDeleteArchive = (
    archiveId: number, source: CancelTokenSource): Promise<ArchiveDto> => {

    return axios
        .delete(`${apiUri}/archive/${archiveId}`, {cancelToken: source.token})
        .then(response => response.data);
};

export const permanentlyDeleteCustomerContact = (
    customerContactId: number, source: CancelTokenSource): Promise<CustomerContactDto> => {

    return axios
        .delete(`${apiUri}/customer-contact/${customerContactId}`, {cancelToken: source.token})
        .then(response => response.data);
};

export const retrieveProduct = (productId: number, source: CancelTokenSource): Promise<ProductDto> => {

    return axios
        .put(`${apiUri}/products/retrieve/${productId}`, productId, {cancelToken: source.token})
        .then(response => response.data);
};