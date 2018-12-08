import axios from "axios/index";
import Cookie from 'js-cookie';


// https://github.com/axios/axios/issues/649
export default () => {
    const token = Cookie.get('your-id');
    axios.defaults.baseURL = 'http://192.168.56.101:8000';
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    return axios;
}
