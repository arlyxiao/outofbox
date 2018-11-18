import axios from "axios/index";
import React from "react";
import Router from 'next/router'

import Layout from '../shared/Layout';


export default class extends React.Component {

    static async getInitialProps(context) {
        const { id } = context.query;
        const res = await axios.get(`http://192.168.56.101:8000/moon/nodes/${id}?format=json`);

        return {node: res.data}
    }

    constructor(props) {
        super(props);

        this.state = {
            id: props.node.id,
            title: props.node.title,
            body: props.node.revision ? props.node.revision.body : null,
        };
    }

    handleChangeTitle = event => {
        this.setState({title: event.target.value});
    };

    handleChangeBody = event => {
        this.setState({body: event.target.value});
    };

    editNode = () => {
        if (this.state.id === null) {
            return;
        }

        axios({
                method: 'PUT',
                url: `http://192.168.56.101:8000/moon/nodes/${this.state.id}/`,
                data: {
                    title: this.state.title,
                    type: 'text',
                    revisions: [
                        {'body': this.state.body ? this.state.body : ''}
                    ]
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                alert('Edit done.');
                Router.push(`/manage/node`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <Layout>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="form-title"
                           aria-describedby="titleHelp" placeholder=""
                           onChange={this.handleChangeTitle}
                           value={this.state.title}/>
                    <small id="titleHelp" className="form-text text-muted">

                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea className="form-control rounded-0" id="form-body"
                              placeholder="Your words could save thousands of people"
                              onChange={this.handleChangeBody}
                              value={this.state.body}
                              rows="10"></textarea>
                </div>

                <button type="submit" className="btn btn-primary" onClick={this.editNode}>Submit</button>
            </Layout>
        );
    }

}
