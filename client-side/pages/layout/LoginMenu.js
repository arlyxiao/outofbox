import React from 'react'
import Link from 'next/link'

import Cookie from 'js-cookie';
import Router from "next/router";

import WrapAxios from '../../service/axios';


export default class LoginMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        const instance = this;
        WrapAxios.get(`/moon/api/user`)
            .then(function (response) {
                // console.log(response.data.username);
                instance.setState({
                    user: response.data
                });
            })
            .catch(function (error) {
            })
            .then(function () {
            });
    }

    logout = (event) => {
        event.preventDefault();

        const instance = this;
        WrapAxios({
            method: 'POST',
            url: '/moon/api/logout',
            headers: {
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
        const user = this.state.user;

        return (
            <div>
                {(!user || !user.username) &&
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link as={`/login`} href={`/login`}>
                            <a className="nav-link">登录</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link as={`/register`} href={`/register`}>
                            <a className="nav-link">注册</a>
                        </Link>
                    </li>
                </ul>
                }

                {user && user.username &&
                <div className="ml-auto dropdown show">
                    <Link as={`/`} href={`/`}>
                        <a className="dropdown-toggle top-menu"
                           data-toggle="dropdown">
                            {this.state.user.username}
                        </a>
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
