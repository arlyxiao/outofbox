import axios from "axios/index";
import React from "react";

import authenticate from '../../../service/AdminAuth';
import Layout from '../layout/main';
import Form from './Form';


export default class extends React.Component {

    static async getInitialProps(context) {
        const user = await authenticate(context);

        const {id} = context.query;
        const constants = await axios.get(`/moon/manage/nodes/constants`);
        const node = await axios.get(`/moon/manage/nodes/${id}`);

        return {
            user: user.data,
            node: node.data,
            constants: constants.data
        }
    }

    constructor(props) {
        super(props);

        console.log('====');
        console.log(props.user);
        console.log('====');
    }

    render() {
        return (
            <Layout>
                <Form node={this.props.node} constants={this.props.constants} action="update" />
            </Layout>
        );
    }

}
