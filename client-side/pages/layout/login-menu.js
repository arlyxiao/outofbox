import React from 'react'
import Link from 'next/link'
import axios from "axios/index";

import Cookie from 'js-cookie';
import Router from "next/router";


export default class LoginMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        const instance = this;

        const token = Cookie.get('your-id');
        if (token) {
            const headers = {headers: {Authorization: `Token ${token}`}};
            axios.get(`http://192.168.56.101:8000/moon/api/user?format=json`, headers)
                .then(function (response) {
                    instance.setState({
                        user: response.data
                    });
                })
                .catch(function (error) {
                })
                .then(function () {
                    // always executed
                });
        }
    }

    logout = (event) => {
        event.preventDefault();

        const token = Cookie.get('your-id');
        const instance = this;
        axios({
            method: 'POST',
            url: 'http://192.168.56.101:8000/moon/api/logout',
            headers: {
                'Authorization': 'Token ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                // console.log(response.data.token);
                Cookie.remove('your-id', {path: ''});
                instance.setState({
                    user: null
                });
                console.log("logout done");

                Router.push(`/`);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                {!this.state.user &&
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link as={`/login`} href={`/login`}>
                            <a className="nav-link">登录</a>
                        </Link>
                    </li>
                </ul>
                }

                {this.state.user &&
                <div className="ml-auto dropdown show">
                    <Link as={`/`} href={`/`}>
                        <a className="dropdown-toggle top-menu" data-toggle="dropdown">{this.state.user.username}</a>
                    </Link>

                    <div className="dropdown-menu">
                        <Link as={`/`} href={`/`}>
                            <a className="dropdown-item" onClick={this.logout}>退出</a>
                        </Link>
                    </div>
                </div>
                }

                <style jsx global>{`
                a.top-menu, a.top-menu:hover {
                    color: rgba(255,255,255,.5);
                    text-decoration: none;
                }

                a.top-menu:visited, a.top-menu:active {
                    color: white;
                }

                a.dropdown-item {
                    color: #16181b;
                }
                `}</style>
            </div>
        );
    }
}
