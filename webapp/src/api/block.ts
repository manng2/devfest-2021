import { url } from './index';

export const getBlocksByWorkspaceId = (workspaceId) => {
 return `${url}/block/workspace/${workspaceId}`
};

export const createBlockByWorkspaceId = (workspaceId) => {
  return `${url}/block/workspace/${workspaceId}/create`
}

export const updateBlockByBlockId = (blockId) => {
  return `${url}/block/${blockId}/update`
}
