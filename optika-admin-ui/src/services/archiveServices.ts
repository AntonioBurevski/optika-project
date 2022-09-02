import axios, {CancelTokenSource} from 'axios';
import {ArchiveDto, UpsertArchiveDto} from "../ts-types/api.types";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const apiUri = `/api/archives`;

export const getAllArchives = (
    source: CancelTokenSource): Promise<Array<ArchiveDto>> => {

    return axios
        .get(apiUri, { cancelToken: source.token })
        .then(response => response.data);
};

export const findArchiveById = (
    id: number, source: CancelTokenSource): Promise<ArchiveDto> => {

    return axios
        .get(`${apiUri}/${id}`, {cancelToken: source.token})
        .then(response => response.data);
};

export const saveToArchive = (
    upsertArchive: Partial<UpsertArchiveDto>, source: CancelTokenSource): Promise<ArchiveDto> => {

    return axios
        .post(apiUri, upsertArchive, {cancelToken: source.token})
        .then(response => response.data);
};

export const deleteArchive = (
    archiveId: number, source: CancelTokenSource): Promise<ArchiveDto> => {

    return axios
        .delete(`${apiUri}/${archiveId}`, {cancelToken: source.token})
        .then(response => response.data);
};