import React from "react";

import Layout from '../layout/Main';
import Form from './Form';
import axios from "axios/index";


export default class extends React.Component {

    static async getInitialProps(context) {
        const res = await axios.get(`http://192.168.56.101:8000/moon/nodes/constants?format=json`);

        return {constants: res.data}
    }

    constructor(props) {
        super(props);

        this.state = {
            constants: props.constants
        }
    }

    render() {
        return (
            <Layout>
                <Form action="create" constants={this.state.constants} />
            </Layout>
        );
    }

}
