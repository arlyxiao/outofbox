import React from "react";
import axios from "axios/index";
import Router from "next/router";

import {Typeahead} from 'react-bootstrap-typeahead';


export default class Form extends React.Component {

    constructor(props) {
        super(props);

        if (props.node == null) {
            this.state = {
                type: 'text',
                title: '',
                body: '',
                current_state: 'draft',
                current_channel: props.constants.channels['software'],
                node_states: props.constants.node_states,
                types: props.constants.types,
                channels: props.constants.channels,
                tags: props.constants.tags,
                selected_tags: [],
                action: props.action
            };
        } else {
            this.state = {
                id: props.node.id,
                type: props.node.type,
                title: props.node.title,
                body: props.node.revision ? props.node.revision.body : '',
                current_state: props.node.state,
                current_channel: props.node.parent_id,
                node_states: props.constants.node_states,
                types: props.constants.types,
                channels: props.constants.channels,
                tags: props.constants.tags,
                selected_tags: props.node.tags,
                action: props.action
            };
        }
    }

    handleChangeChannel = event => {
        this.setState({current_channel: event.target.value});
    };

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

    refreshSelectedTags = tags => {
        const buildSelectedTags = (item) => {
            if (item.name !== undefined) {
                return {'name': item.name};
            }

            if (item.label !== undefined) {
                return {'name': item.label};
            }

            return {'name': item};
        };
        return tags.map((item) => buildSelectedTags(item));
    };


    createNode = () => {
        axios({
            method: 'POST',
            url: 'http://192.168.56.101:8000/moon/manage/nodes/',
            data: {
                user_id: 1,
                title: this.state.title,
                type: 'text',
                parent_id: this.state.current_channel,
                state: this.state.current_state,
                tags: this.refreshSelectedTags(this.state.selected_tags),
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
    };


    updateNode = () => {
        if (this.state.id === null) {
            alert('empty data');
            return;
        }

        axios({
            method: 'PUT',
            url: `http://192.168.56.101:8000/moon/manage/nodes/${this.state.id}/`,
            data: {
                title: this.state.title,
                type: this.state.type,
                parent_id: this.state.current_channel,
                revisions: [
                    {'body': this.state.body}
                ],
                tags: this.refreshSelectedTags(this.state.selected_tags),
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
        const channels = this.state.channels;
        const tags = this.state.tags;

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="form-type">Type</label>
                    <select className="form-control"
                            id="form-type"
                            value={this.state.type}
                            onChange={this.handleChangeType}>
                        {this.state.types.map(function (name, index) {
                            return <option key={name} value={name}>{name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="form-channel">Channel</label>
                    <select className="form-control"
                            id="form-channel"
                            value={this.state.current_channel}
                            onChange={this.handleChangeChannel}>
                        {Object.keys(channels).map(function (name, index) {
                            let id = channels[name];
                            return <option key={name} value={id}>{name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="form-title">Title</label>
                    <input type="text" className="form-control" id="form-title"
                           placeholder=""
                           onChange={this.handleChangeTitle}
                           value={this.state.title}/>
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
                    <label htmlFor="form-tag">Tags</label>
                    <Typeahead
                        labelKey="name"
                        multiple={true}
                        options={tags}
                        defaultSelected={this.state.selected_tags ? this.state.selected_tags : []}
                        allowNew
                        onChange={(selected_tags) => {
                            this.setState({selected_tags});
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="form-state">State</label>
                    <select className="form-control"
                            id="form-state"
                            value={this.state.current_state}
                            onChange={this.handleChangeCurrentState}>
                        {this.state.node_states.map(function (name, index) {
                            return <option key={name} value={name}>{name}</option>;
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
