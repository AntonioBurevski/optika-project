import {CoreSearchRequest, CustomerContactCoreDto, HotDealCoreDto, ProductCoreDto} from "../ts-types/api.types";
import axios, {CancelTokenSource} from "axios";
import {ProductCoreSearchRequest, ProductCoreSearchResult} from "../components/utils/apiTypes";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const apiUri = `/api`;

export const searchProducts = (
    request: Partial<ProductCoreSearchRequest>,
    source: CancelTokenSource): Promise<ProductCoreSearchResult[]> => {
    return axios
        .post(`${apiUri}/search`, request, { cancelToken: source.token })
        .then(response => response.data);
};

export const saveContactInfo = (
    contactInfo: Partial<CustomerContactCoreDto>, source: CancelTokenSource): Promise<CustomerContactCoreDto> => {

    return axios
        .post(`${apiUri}/save-contact-info`, contactInfo, {cancelToken: source.token})
        .then(response => response.data);
};

export const getAllProducts = (
    source: CancelTokenSource): Promise<Array<ProductCoreDto>> => {

    return axios
        .get(`${apiUri}/products`, { cancelToken: source.token })
        .then(response => response.data);
};

export const findProductById = (
    productId: number, source: CancelTokenSource): Promise<ProductCoreDto> => {

    return axios
        .get(`${apiUri}/products/${productId}`, { cancelToken: source.token })
        .then(response => response.data);
};

export const getHotDealsToDisplay = (
    source: CancelTokenSource): Promise<Array<ProductCoreDto>> => {

    return axios
        .get(`${apiUri}/hot-deals`, { cancelToken: source.token })
        .then(response => response.data);
};

export const findHotDealById = (
    hotDealId: number, source: CancelTokenSource): Promise<Array<ProductCoreDto>> => {

    return axios
        .get(`${apiUri}/hot-deals/${hotDealId}`, { cancelToken: source.token })
        .then(response => response.data);
};

