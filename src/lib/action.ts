import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-authorization'] = process.env.SLIPOK_API_KEY;
const apiSlipOK = axios.create({
  baseURL: 'https://api.slipok.com/api/line/apikey/22150',
});

export const postSlipOK = async (data: any) => {
  try {
    const { data: res } = await apiSlipOK.post('', data);
    return res;
  } catch (error) {
    console.log('error', error);
  }
};
