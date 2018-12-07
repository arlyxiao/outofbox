import React from 'react'
import axios from "axios/index";

import Cookie from 'js-cookie';

import Layout from './layout/main';
import Router from "next/router";


export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidUpdate(prevProps) {

    }

    handleChange = (event) => {
        let data = {};
        data[event.target.name] = event.target.value;
        this.setState(data);
    };

    login = (event) => {
        event.preventDefault();

        const instance = this;
        axios({
            method: 'POST',
            url: 'http://192.168.56.101:8000/moon/api/login',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                // console.log(response.data.token);
                Cookie.set('your-id', response.data.token, { expires: 7 });
                console.log("login done");

                Router.push(`/`);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <Layout>

                <main role="main" className="container">
                    <form autoComplete="on">
                        <div className="my-3 p-3 bg-white rounded shadow-sm col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control"
                                       autoComplete="on"
                                       name="username"
                                       placeholder="Username"
                                       value={this.state.username}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                       autoComplete="off"
                                       name="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"/>
                                <label className="form-check-label">
                                    记住密码
                                </label>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary"
                                    onClick={this.login}>登录
                            </button>
                        </div>
                    </form>

                </main>

                <style jsx>{`
                button {
                    margin-top: 1.5rem;
                }
                `}</style>

            </Layout>
        );
    }

}
