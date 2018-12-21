import nookies from 'nookies'
import axios from "axios/index";

const site = require('../site')();


export default function (context) {

    const cookie = nookies.get(context);
    const token = cookie['your-id'];
    // const headers = {headers: {Authorization: `Token ${token}`}};

    axios.defaults.baseURL = site['data_server'];
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    const user = axios.get(`/moon/api/admin-user`);

    return user;
}
