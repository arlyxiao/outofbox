import axios from "axios/index";
import Cookie from 'js-cookie';

const site = require('../site')();


// https://github.com/axios/axios/issues/649
const fetch = () => {
    const token = Cookie.get('your-id');
    axios.defaults.baseURL = site['data_server'];
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    return axios;
};

export default fetch();
