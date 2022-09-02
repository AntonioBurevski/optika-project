import axios, {CancelTokenSource} from 'axios';
import {HotDealDto, HotDealSearchDto, UpsertHotDealDto} from "../ts-types/api.types";

const {REACT_APP_API_BASE_URL: baseUrl} = process.env;
const apiUri = `/api/hot-deals`;

export const searchHotDeals = (hotDealSearchRequest: Partial<HotDealSearchDto>,
                               source: CancelTokenSource): Promise<Array<HotDealDto>> => {

    return axios
        .post(`${apiUri}/search`, hotDealSearchRequest, {cancelToken: source.token})
        .then(response => response.data)
};

export const getAllHotDeals = (
    source: CancelTokenSource): Promise<Array<HotDealDto>> => {

    return axios
        .get(apiUri, {cancelToken: source.token})
        .then(response => response.data);
};

export const findHotDealById = (
    id: number, source: CancelTokenSource): Promise<UpsertHotDealDto> => {

    return axios
        .get(`${apiUri}/${id}`, {cancelToken: source.token})
        .then(response => response.data);
};

export const addHotDeal = (
    upsertHotDeal: Partial<UpsertHotDealDto>, source: CancelTokenSource): Promise<HotDealDto> => {

    return axios
        .post(apiUri, upsertHotDeal, {cancelToken: source.token})
        .then(response => response.data);
};

export const editHotDeal = (
    hotDealId: number, upsertHotDeal: Partial<UpsertHotDealDto>, source: CancelTokenSource): Promise<HotDealDto> => {

    return axios
        .put(`${apiUri}/${hotDealId}`, upsertHotDeal, {cancelToken: source.token})
        .then(response => response.data);
};

export const deleteHotDeal = (
    hotDealId: number, source: CancelTokenSource): Promise<HotDealDto> => {

    return axios
        .delete(`${apiUri}/${hotDealId}`, {cancelToken: source.token})
        .then(response => response.data);
};