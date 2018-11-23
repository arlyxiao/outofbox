import React from "react";
import axios from "axios/index";
import Router from "next/router";


export default class Form extends React.Component {

    constructor(props) {
        super(props);

        if (props.node == null) {
            this.state = {
                type: 'text',
                title: '',
                body: '',
                current_state: 'draft',
                node_states: props.constants.node_states,
                types: props.constants.types,
                action: props.action
            };
        } else {
            this.state = {
                id: props.node.id,
                type: props.node.type,
                title: props.node.title,
                body: props.node.revision ? props.node.revision.body : '',
                current_state: props.node.state,
                node_states: props.constants.node_states,
                types: props.constants.types,
                action: props.action
            };
        }
    }

    handleChangeType = event => {
        this.setState({type: event.target.value});
    };

    handleChangeTitle = event => {
        this.setState({title: event.target.value});
    };

    handleChangeBody = event => {
        this.setState({body: event.target.value});
    };

    handleChangeCurrentState = event => {
        this.setState({current_state: event.target.value});
    };

    createNode = () => {
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


    updateNode = () => {
        if (this.state.id === null) {
            alert('empty data');
            return;
        }

        axios({
            method: 'PUT',
            url: `http://192.168.56.101:8000/moon/nodes/${this.state.id}/`,
            data: {
                title: this.state.title,
                type: this.state.type,
                revisions: [
                    {'body': this.state.body}
                ],
                state: this.state.current_state
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                console.log(response);
                alert('Update done.');
                Router.push(`/manage/node`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const currentState = this.state.current_state;
        const currentType = this.state.type;

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="form-state">Type</label>
                    <select className="form-control" id="form-state" onChange={this.handleChangeType}>
                        {this.state.types.map(function (name, index) {
                            let selected = (name === currentType) ? 'selected' : '';
                            return <option key={name} selected={selected} value={name}>{name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="form-title">Title</label>
                    <input type="text" className="form-control" id="form-title"
                           aria-describedby="titleHelp" placeholder=""
                           onChange={this.handleChangeTitle}
                           value={this.state.title}/>
                    <small id="titleHelp" className="form-text text-muted">

                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="form-body">Body</label>
                    <textarea className="form-control rounded-0" id="form-body"
                              placeholder="Your words could save thousands of people"
                              onChange={this.handleChangeBody}
                              value={this.state.body}
                              rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="form-state">State</label>
                    <select className="form-control" id="form-state" onChange={this.handleChangeCurrentState}>
                        {this.state.node_states.map(function (name, index) {
                            let selected = (name === currentState) ? 'selected' : '';
                            return <option key={name} selected={selected} value={name}>{name}</option>;
                        })}
                    </select>
                </div>

                {this.state.action === 'update' &&
                <button type="submit" className="btn btn-primary" onClick={this.updateNode}>Submit</button>
                }

                {this.state.action === 'create' &&
                <button type="submit" className="btn btn-primary" onClick={this.createNode}>Submit</button>
                }

            </div>
        );
    }

}
