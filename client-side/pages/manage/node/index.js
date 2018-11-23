import axios from "axios/index";
import React from "react";
import Link from 'next/link'

import Layout from '../layout/Main';
import Router from "next/router";


const EditLink = (props) => (
    <Link as={`/manage/node/edit/${props.id}`} href={`/manage/node/edit?id=${props.id}`}>
        <a className="btn btn-success btn-sm">Edit</a>
    </Link>
)

export default class extends React.Component {

    static async getInitialProps() {
        const res = await axios.get('http://192.168.56.101:8000/moon/nodes/?format=json');
        return {nodeList: res.data}
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
                                <td onClick={() => { if (window.confirm('Are you sure to remove?')) this.removeNode(item.id) } }>
                                    <a href="javascript: void(0);" className="btn btn-success btn-sm">Remove</a>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </Layout>
        );
    }

}
