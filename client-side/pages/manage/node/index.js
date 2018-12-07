import axios from "axios/index";
import React from "react";
import Link from 'next/link'
import Router from "next/router";

import nookies from 'nookies'

import Layout from '../layout/main';
import Pagination from "../../../components/pagination";


const EditLink = (props) => (
    <Link as={`/manage/node/edit/${props.id}`} href={`/manage/node/edit?id=${props.id}`}>
        <a className="btn btn-success btn-sm">Edit</a>
    </Link>
);

export default class extends React.Component {

    static async getInitialProps(context) {
        const cookie = nookies.get(context);
        const token = cookie['your-id'];
        const headers = {headers: {Authorization: `Token ${token}`}};
        const constants = await axios.get(`http://192.168.56.101:8000/moon/manage/nodes/constants?format=json`, headers);

        const page = context.query.page ? `page=${context.query.page}` : '';
        const nodes = await axios.get(`http://192.168.56.101:8000/moon/manage/nodes?${page}&format=json`);

        // pagination params
        const maxPageNumber = parseInt(constants.data.max_page_size);
        const dataTotal = nodes.data.count;
        const pageSize = parseInt(constants.data.page_size);
        const currentPage = context.query.page ? parseInt(context.query.page) : 0;
        const nextPage = nodes.data.next ? nodes.data.next.split('?')[1] : null;
        const prevPage = nodes.data.previous ? nodes.data.previous.split('?')[1] : null;

        return {
            cookie: cookie,
            denied: constants.data.denied,
            nodeList: nodes.data,
            channels: constants.data.channels,

            dataTotal: dataTotal,
            maxPageNumber: maxPageNumber,
            pageSize: pageSize,
            currentPage: currentPage,
            nextPage: nextPage,
            prevPage: prevPage
        }
    }

    constructor(props) {
        super(props);

        console.log('====')
        console.log(props.cookie)
        console.log('====')

        this.state = {
            channels: props.channels
        };
    }

    removeNode = (id) => {
        axios({
            method: 'DELETE',
            url: 'http://192.168.56.101:8000/moon/manage/nodes/' + id + '/'
        })
            .then(function (response) {
                console.log(response);
                alert('Delete done.');
                Router.push(`/manage/node`);
            })
            .catch(function (error) {
                console.log(error);
            });
        ;
    }


    render() {
        const channels = this.state.channels;

        return (
            <Layout>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Channel</th>
                        <th scope="col">Type</th>
                        <th scope="col">Title</th>
                        <th scope="col">State</th>
                        <th scope="col">Updated</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.nodeList.results.map((item, i) => {
                        let channel = Object.keys(channels).find(key => channels[key] === item.parent_id);
                        return (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{channel}</td>
                                <td>{item.type}</td>
                                <td>{item.title}</td>
                                <td>{item.state}</td>
                                <td>{item.updated_at}</td>
                                <td>
                                    <EditLink id={item.id}/>
                                </td>
                                <td onClick={() => {
                                    if (window.confirm('Are you sure to remove?')) this.removeNode(item.id)
                                }}>
                                    <a href="javascript: void(0);" className="btn btn-success btn-sm">Remove</a>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                <Pagination dataTotal={this.props.dataTotal}
                            maxPageNumber={this.props.maxPageNumber}
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            nextPage={this.props.nextPage}
                            prevPage={this.props.prevPage}
                            pathName='/manage/node'/>
            </Layout>
        );
    }

}
