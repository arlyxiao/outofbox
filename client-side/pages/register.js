import React from 'react'
import axios from "axios/index";

import Layout from './layout/main';


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? context.query.id : '';

        return {}
    }

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <Layout>

                <main role="main" className="container">

                    <div className="my-3 p-3 bg-white rounded shadow-sm col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control"
                                       name="email"
                                       placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control"
                                       name="password"
                                       placeholder="Password"/>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"/>
                                    <label className="form-check-label">
                                        Check me out
                                    </label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

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
