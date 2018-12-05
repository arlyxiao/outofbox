import React from 'react'
import Link from 'next/link'
import axios from "axios/index";

import Layout from './layout/main';
import Cookies from "universal-cookie";


export default class extends React.Component {

    static async getInitialProps(context) {
        return {};
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
                    <img className="mx-auto d-block" src="/static/in-progress.png" />
                </main>

            </Layout>
        );
    }

}
