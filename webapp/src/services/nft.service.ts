import axios from 'axios';
import { generateNFTProductUrl } from '../api/nft';

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

export const generateNFTProduct = (imageData: string) => {
  const url = generateNFTProductUrl();

  return postData(url, {
    imageData
  })
}
