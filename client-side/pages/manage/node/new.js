import React from "react";

import WrapAxios from '../../../service/axios';

import authenticate from '../../../service/AdminAuth';
import Layout from '../layout/main';
import Form from './Form';


export default class extends React.Component {

    static async getInitialProps(context) {
        const user = await authenticate(context);

        const res = await WrapAxios.get(`/moon/manage/nodes/constants`);

        return {
            user: user.data,
            constants: res.data
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
                <Form action="create" constants={this.props.constants} />
            </Layout>
        );
    }

}
