import React from 'react'
import Link from 'next/link'
import axios from "axios/index";

import Cookie from 'js-cookie';


const loginedMenu = (data) => (
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link as={`/`} href={`/`}>
                <a className="nav-link">{data.username}</a>
            </Link>
        </li>
    </ul>
);

const menu = () => (
    <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link as={`/login`} href={`/login`}>
                <a className="nav-link">登录</a>
            </Link>
        </li>
    </ul>
);

export default class LoginMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: menu()
        };

        const context = this;

        const token = Cookie.get('your-id');
        const headers = {headers: {Authorization: `Token ${token}`}};
        axios.get(`http://192.168.56.101:8000/moon/api/user?format=json`, headers)
            .then(function (response) {
                context.setState({
                    menu: loginedMenu(response.data)
                });
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            });


    }

    render() {
        return (
            <div>
                {this.state.menu}
            </div>
        );
    }
}
