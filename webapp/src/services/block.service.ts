import axios from 'axios';
import { getBlocksByWorkspaceId, updateBlockByBlockId, createBlockByWorkspaceId } from '../api/block';

const fetchData = async (url: string, queryParams?: any) => {
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
export const getBlocks = async (workspaceId, page = 1) => {
  const url = getBlocksByWorkspaceId(workspaceId);

  return fetchData(url, {
    page
  });
}

export const createBlock = async (name, type, workspaceId, page) => {
  const url = createBlockByWorkspaceId(workspaceId);

  return postData(url, {
    name,
    type,
    page
  })
}

export const updateBlock = async (block) => {
  const url = updateBlockByBlockId(block._id);

  return postData(url, {
    block
  })
}
