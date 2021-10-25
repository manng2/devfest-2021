import { url } from './index';

export const getWorkspaceInfoById = (id) => {
  return `${url}/workspace/${id}`
}

export const getSpaceInfoById = (id) => {
 return `${url}/workspace/${id}/space`
};

export const createSpace = (id) => {
  return `${url}/workspace/${id}/create`
}

export const createWorkSpace = () => {
  return `${url}/workspace/create`
}
