import nookies from 'nookies'
import axios from "axios/index";


export default function (context) {

    const cookie = nookies.get(context);
    const token = cookie['your-id'];
    // const headers = {headers: {Authorization: `Token ${token}`}};

    axios.defaults.baseURL = 'http://192.168.56.101:8000';
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    const user = axios.get(`/moon/api/admin-user`);

    return user;
}
