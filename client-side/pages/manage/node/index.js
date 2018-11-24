import axios from "axios/index";
import React from "react";
import Link from 'next/link'
import Router from "next/router";

import Layout from '../layout/Main';


const EditLink = (props) => (
    <Link as={`/manage/node/edit/${props.id}`} href={`/manage/node/edit?id=${props.id}`}>
        <a className="btn btn-success btn-sm">Edit</a>
    </Link>
)

const PaginationLink = (props) => (
    <Link as={`/manage/node?${props.page}`} href={`/manage/node?${props.page}`}>
        <a className="page-link">{props.name}</a>
    </Link>
)

export default class extends React.Component {

    static async getInitialProps(context) {
        const page = context.query.page ? `page=${context.query.page}` : '';
        const nodes = await axios.get(`http://192.168.56.101:8000/moon/nodes?${page}&format=json`);
        const constants = await axios.get(`http://192.168.56.101:8000/moon/nodes/constants?format=json`);

        const totalPageNumber = Math.ceil(nodes.data.count / constants.data.page_size);
        const maxPageSize = parseInt(constants.data.max_page_size)
        const pageNumber = totalPageNumber > maxPageSize ? maxPageSize : totalPageNumber;
        let start = 0;
        const paginationParams = {
            dataTotal: nodes.data.count,
            pageNumber: pageNumber,
            prevPage: nodes.data.previous ? nodes.data.previous.split('?')[1] : null,
            nextPage: nodes.data.next ? nodes.data.next.split('?')[1] : null,
            numberArray: [...(new Array(pageNumber))].map((_, i) => i + 1),
            start: start
        };

        const currentPage = context.query.page ? parseInt(context.query.page) : 0;
        start = currentPage - maxPageSize + 1;
        start = start > 0 ? start : 0;
        paginationParams.currentPage = currentPage;
        if (start > 0) {
            paginationParams.start = start;
            paginationParams.pageNumber = maxPageSize;
            paginationParams.numberArray = [...(new Array(pageNumber))].map((_, i) => i + start);
        }

        return {
            nodeList: nodes.data,
            paginationParams: paginationParams,
        }
    }

    constructor(props) {
        super(props)
    }

    removeNode = (id) => {
        axios({
            method: 'DELETE',
            url: 'http://192.168.56.101:8000/moon/nodes/' + id + '/'
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
        const currentPage = this.props.paginationParams.currentPage;
        return (
            <Layout>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
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
                        return (
                            <tr key={i}>
                                <td>{item.id}</td>
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

                <nav aria-label="Page navigation">
                    <ul className="pagination">

                        {this.props.paginationParams.prevPage &&
                        <li className="page-item">
                            <PaginationLink page={this.props.paginationParams.prevPage}
                                            name="prev"/>
                        </li>
                        }

                        {this.props.paginationParams.start > 1 &&
                        <li className="page-item">
                            <PaginationLink page={'page=1'}
                                            name="1..."/>
                        </li>
                        }

                        {this.props.paginationParams.pageNumber > 1 &&
                        this.props.paginationParams.numberArray.map(function (number, index) {
                            let style = currentPage === number ? 'page-item active' : 'page_item';
                            return <li className={style} key={number}>
                                <PaginationLink page={'page=' + number}
                                                name={number}/>
                            </li>;
                        })
                        }


                        {this.props.paginationParams.nextPage &&
                        <li className="page-item">
                            <PaginationLink page={this.props.paginationParams.nextPage}
                                            name="next"/>
                        </li>
                        }

                    </ul>
                </nav>
            </Layout>
        );
    }

}
