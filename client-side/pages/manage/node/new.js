import axios from "axios/index";
import React from "react";
import Router from 'next/router'

import Layout from '../shared/Layout';


export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            body: null,
        };
    }

    handleChangeTitle = event => {
        this.setState({title: event.target.value});
    };

    handleChangeBody = event => {
        this.setState({body: event.target.value});
    };

    saveNode = () => {
        axios({
                method: 'POST',
                url: 'http://192.168.56.101:8000/moon/nodes/',
                data: {
                    user_id: 1,
                    title: this.state.title,
                    type: 'text',
                    revisions: [
                        {'body': this.state.body}
                    ]
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(function (response) {
                console.log(response);
                alert('Create done.');
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

                <button type="submit" className="btn btn-primary" onClick={this.saveNode}>Submit</button>
            </Layout>
        );
    }

}
