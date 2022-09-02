import axios, {CancelTokenSource} from "axios";
import {CustomerContactDto} from "../ts-types/api.types";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const apiUri = `/api/customer-contact`;

export const getAllCustomerContacts = (
    source: CancelTokenSource): Promise<Array<CustomerContactDto>> => {

    return axios
        .get(apiUri, { cancelToken: source.token })
        .then(response => response.data);
};

export const findCustomerContactById = (
    id: number, source: CancelTokenSource): Promise<CustomerContactDto> => {

    return axios
        .get(`${apiUri}/${id}`, { cancelToken: source.token })
        .then(response => response.data);
};

export const deleteCustomerContact = (
    customerContactId: number, source: CancelTokenSource): Promise<CustomerContactDto> => {

    return axios
        .delete(`${apiUri}/${customerContactId}`, {cancelToken: source.token})
        .then(response => response.data);
};