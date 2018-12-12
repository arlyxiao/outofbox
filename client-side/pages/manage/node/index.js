import axios from "axios/index";
import React from "react";
import Link from 'next/link'
import Router from "next/router";

import authenticate from '../../../service/AdminAuth';
import Layout from '../layout/main';
import Pagination from "../../../components/pagination";
import WrapAxios from '../../../service/axios';

const wrapAxios = WrapAxios();


const EditLink = (props) => (
    <Link as={`/manage/node/edit/${props.id}`} href={`/manage/node/edit?id=${props.id}`}>
        <a className="btn btn-success btn-sm">Edit</a>
    </Link>
);

export default class extends React.Component {

    static async getInitialProps(context) {
        const user = await authenticate(context);

        const constants = await axios.get(`/moon/manage/nodes/constants`);

        const page = context.query.page ? context.query.page : 1;
        const type = context.query.type ? encodeURIComponent(context.query.type) : '';
        const state = context.query.state ? context.query.state : '';
        const title = context.query.title ? encodeURIComponent(context.query.title) : '';

        const query = `page=${page}&type=${type}&state=${state}&title=${title}`;
        const nodes = await axios.get(`/moon/manage/nodes?${query}`);

        // pagination params
        const maxPageNumber = parseInt(constants.data.max_page_size);
        const dataTotal = nodes.data.count;
        const pageSize = parseInt(constants.data.page_size);
        const currentPage = context.query.page ? parseInt(context.query.page) : 0;
        const nextPage = nodes.data.next ? nodes.data.next.split('?')[1] : null;
        const prevPage = nodes.data.previous ? nodes.data.previous.split('?')[1] : null;

        return {
            user: user.data,
            nodes: nodes.data,
            channels: constants.data.channels,
            types: constants.data.types,
            nodeStates: constants.data.node_states,

            type: type,
            state: state,
            title: title,

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

        // console.log('====');
        // console.log(props.user);
        // console.log('====');

        this.state = {
            type: props.type,
            state: props.state,
            title: decodeURIComponent(props.title),
            channels: props.channels,
            types: props.types,
            nodeStates: props.nodeStates
        };
    }

    handleChange = (event) => {
        let data = {};
        data[event.target.name] = event.target.value;
        this.setState(data);
    };

    removeNode = (id) => {
        wrapAxios({
            method: 'DELETE',
            url: '/moon/manage/nodes/' + id + '/'
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
    };


    render() {
        const channels = this.state.channels;
        const types = this.state.types;

        return (
            <Layout>
                <form className="form-inline container justify-content-end"
                      method="get"
                      action="/manage/node">
                    <div className="card col-lg-12">
                        <div className="card-body row">
                            <div className="col-sm-3">
                                <select className="form-control"
                                        name="type"
                                        value={this.state.type}
                                        onChange={this.handleChange}>
                                    <option value="">Please select type</option>
                                    {types.map(function (name, index) {
                                        return <option key={name} value={name}>{name}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="col-sm-3">
                                <select className="form-control"
                                        name="state"
                                        value={this.state.state}
                                        onChange={this.handleChange}>
                                    <option value="">Please select state</option>
                                    {this.state.nodeStates.map(function (name, index) {
                                        return <option key={name} value={name}>{name}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="col-sm-4">
                                <input type="text"
                                       name="title"
                                       placeholder=" Title"
                                       onChange={this.handleChange}
                                       value={this.state.title} />
                            </div>

                            <div className="col-sm-2">
                                <button className="btn btn-secondary btn-sm my-2 my-sm-0"
                                        type="submit">GO
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

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
                    {this.props.nodes.results.map((item, i) => {
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

                            type={this.state.type}
                            state={this.state.state}
                            title={this.state.title}

                            pathName='/manage/node'/>

                <style jsx>{`
                table {
                    margin-top: 2rem;
                }

                form {
                    input {
                        width: 16rem;
                    }
                }
                `}</style>
            </Layout>
        );
    }

}
