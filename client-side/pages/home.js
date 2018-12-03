import React from 'react'
import Link from 'next/link'
import axios from "axios/index";

import Layout from './layout/main';


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? context.query.id.toString() : '';
        return {
            menuClickTime: +new Date(),
            id: id
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            menuClickTime: props.menuClickTime,
            id: props.id
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menuClickTime !== prevProps.menuClickTime) {
            this.setState({
                menuClickTime: this.props.menuClickTime,
                id: this.props.id
            });
        }
    }


    render() {
        return (
            <Layout>

                <main role="main" className="container">
                    <img className="mx-auto d-block" src="/static/in-progress-home.png" />
                </main>

            </Layout>
        );
    }

}
