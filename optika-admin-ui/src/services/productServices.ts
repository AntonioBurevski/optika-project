import axios, {CancelTokenSource} from 'axios';
import {ProductDto, ProductSearchDto, UpsertProductDto} from "../ts-types/api.types";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const apiUri = `/api/products`;

export const searchProducts = (productSearchRequest: Partial<ProductSearchDto>,
                               source: CancelTokenSource): Promise<Array<ProductDto>> => {

    return axios
        .post(`${apiUri}/search`, productSearchRequest,{cancelToken: source.token})
        .then(response => response.data)
};

export const getProductsForHotDeals = (
    source: CancelTokenSource): Promise<Array<ProductDto>> => {

    return axios
        .get(`${apiUri}/products/hot-deal`, { cancelToken: source.token })
        .then(response => response.data);
};

export const getAllProducts = (
    source: CancelTokenSource): Promise<Array<ProductDto>> => {

    return axios
        .get(apiUri, { cancelToken: source.token })
        .then(response => response.data);
};

export const findProductById = (
    id: number, source: CancelTokenSource) : Promise<ProductDto> => {

    return axios
        .get(`${apiUri}/${id}`,{cancelToken: source.token})
        .then(response => response.data);
};

export const getProductById = (
    id: number, source: CancelTokenSource) : Promise<UpsertProductDto> => {

    return axios
        .get(`${apiUri}/get/${id}`,{cancelToken: source.token})
        .then(response => response.data);
};

export const addProduct = (
    values: Partial<UpsertProductDto>,
    source: CancelTokenSource): Promise<ProductDto> => {

    let bodyFormData = new FormData();
    Object.keys(values).forEach((key) => {
        let value = values[key as keyof UpsertProductDto];

        if (value) {
            if (typeof value === "number") {
                //@ts-ignore
                value = value.toString();
            }
            //@ts-ignore
            bodyFormData.append(key, value);
        }
    });

    return axios
        .post(apiUri, bodyFormData, {cancelToken: source.token})
        .then(response => response.data);
};

export const editProduct = (
    productId: number,
    values: Partial<UpsertProductDto>,
    source: CancelTokenSource): Promise<ProductDto> => {

    let bodyFormData = new FormData();
    Object.keys(values).forEach((key) => {
        let value = values[key as keyof UpsertProductDto];

        if (value) {
            if (typeof value === "number") {
                //@ts-ignore
                value = value.toString();
            }
            //@ts-ignore
            bodyFormData.append(key, value);
        }
    });

    return axios
        .put(`${apiUri}/${productId}`, bodyFormData, {cancelToken: source.token})
        .then(response => response.data);
};

export const deleteProduct = (
    productId: number, source: CancelTokenSource): Promise<ProductDto> => {

    return axios
        .delete(`${apiUri}/${productId}`, {cancelToken: source.token})
        .then(response => response.data);
};