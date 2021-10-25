import axios from 'axios';
import { createSpace, getWorkspaceInfoById, createWorkSpace, getSpaceInfoById } from '../api/workspace';

const fetchData = async (url: string, queryParams: any = {}) => {
  const keys = Object.keys(queryParams);

  keys.forEach(key => {
    url = url + `?${key}=${queryParams[key]}`
  })

  const { data } = await axios.get(url)

  return data;
}

const postData = async (url: string, body?: any) => {
  const { data } = await axios.post(url, body);

  return data
}

export const getWorkspaceInfo = async (id: string) => {
  const url = getWorkspaceInfoById(id);

  return fetchData(url);
}

export const getSpaceInfo = async (id: string, page: number) => {
  const url = getSpaceInfoById(id);

  return fetchData(url, {
    page
  });
}

export const createNewSpace = async (id: string, data) => {
  const url = createSpace(id);

  return postData(url, data)
}

export const createNewWorkspace = async (name: string) => {
  const url = createWorkSpace();

  return postData(url, {
    name
  })
}
