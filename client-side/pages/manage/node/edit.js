import axios from "axios/index";
import React from "react";

import Layout from '../layout/Main';
import Form from './Form';


export default class extends React.Component {

    static async getInitialProps(context) {
        const {id} = context.query;
        const node = await axios.get(`http://192.168.56.101:8000/moon/nodes/${id}?format=json`);
        const constants = await axios.get(`http://192.168.56.101:8000/moon/nodes/constants?format=json`);

        return {node: node.data, constants: constants.data}
    }

    constructor(props) {
        super(props);

        this.state = {
            node: props.node,
            constants: props.constants
        };
    }


    render() {
        return (
            <Layout>
                <Form node={this.state.node} constants={this.state.constants} action="update" />
            </Layout>
        );
    }

}
