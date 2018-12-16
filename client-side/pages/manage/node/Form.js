import React from "react";
import Router from "next/router";

import {Typeahead} from 'react-bootstrap-typeahead';

import WrapAxios from '../../../service/axios';

const site = require('../../../site')();
const channels = site['menus'];


export default class Form extends React.Component {

    constructor(props) {
        super(props);

        const constants = props.constants;
        const node = props.node ? props.node : null;
        const revision = node ? node.revision : null;

        this.state = {
            id: node ? node.id : '',
            type: node ? node.type : 'text',
            title: node ? node.title : '',
            cover: node ? node.cover : '',
            intro: node ? node.intro : '',
            video: node ? node.video : '',
            body: revision ? revision.body : '',
            currentState: node ? node.state : 'draft',
            currentChannel: node ? node.parent_id : channels['software']['id'],
            nodeStates: constants.node_states,
            types: constants.types,
            tags: constants.tags,
            selectedTags: node ? node.tags : [],
            action: props.action
        };
    }

    componentDidMount() {
        this.setBodyFromIframe(this.state.body);
    }

    handleChange = (event) => {
        let data = {};
        data[event.target.name] = event.target.value;
        this.setState(data);
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

    getBodyFromIframe = () => {
        const iframe = document.getElementById('iframe-editor');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        return innerDoc.getElementById('editor').getElementsByClassName('ql-editor')[0].innerHTML;
    };

    setBodyFromIframe = (body) => {
        const iframe = document.getElementById('iframe-editor');
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        innerDoc.getElementById('editor').getElementsByClassName('ql-editor')[0].innerHTML = body;
    };

    createNode = () => {
        const body = this.getBodyFromIframe();

        const data = {
            user_id: 1,
            title: this.state.title,
            cover: this.state.cover,
            intro: this.state.intro,
            video: this.state.video,
            type: this.state.type,
            parent_id: this.state.currentChannel,
            state: this.state.currentState,
            tags: this.refreshSelectedTags(this.state.selectedTags),
            revisions: [
                {'body': body}
            ]
        };

        console.log(data);

        WrapAxios({
            method: 'POST',
            url: '/moon/manage/nodes/',
            data: data,
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

        const body = this.getBodyFromIframe();

        WrapAxios({
            method: 'PUT',
            url: `/moon/manage/nodes/${this.state.id}/`,
            data: {
                title: this.state.title,
                cover: this.state.cover,
                intro: this.state.intro,
                video: this.state.video,
                type: this.state.type,
                parent_id: this.state.currentChannel,
                revisions: [
                    {'body': body}
                ],
                tags: this.refreshSelectedTags(this.state.selectedTags),
                state: this.state.currentState
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
    };

    render() {
        const tags = this.state.tags;

        return (
            <div>
                <div className="form-group">
                    <label htmlFor="form-type">Type</label>
                    <select className="form-control"
                            name="type"
                            id="form-type"
                            value={this.state.type}
                            onChange={this.handleChange}>
                        {this.state.types.map(function (name, index) {
                            return <option key={name} value={name}>{name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="form-channel">Channel</label>
                    <select className="form-control"
                            name="currentChannel"
                            id="form-channel"
                            value={this.state.currentChannel}
                            onChange={this.handleChange}>
                        {Object.keys(channels).map(function (name, index) {
                            let id = channels[name]['id'];
                            return <option key={name} value={id}>{name}</option>;
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="form-title">Title</label>
                    <input type="text" name="title" className="form-control" id="form-title"
                           placeholder=""
                           onChange={this.handleChange}
                           value={this.state.title}/>
                </div>

                <div className="form-group">
                    <label htmlFor="form-cover">Cover Image</label>
                    <input type="text" name="cover" className="form-control" id="form-cover"
                           placeholder=""
                           onChange={this.handleChange}
                           value={this.state.cover}/>
                </div>

                <div className="form-group">
                    <label htmlFor="form-intro">Intro</label>
                    <textarea className="form-control rounded-0" id="form-intro"
                              name="intro"
                              placeholder="Your intro..."
                              onChange={this.handleChange}
                              value={this.state.intro}
                              rows="4">&nbsp;</textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="form-intro">Video</label>
                    <textarea className="form-control rounded-0" id="form-video"
                              name="video"
                              placeholder="Your video..."
                              onChange={this.handleChange}
                              value={this.state.video}
                              rows="4">&nbsp;</textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="form-body">Body</label>
                    <iframe className="form-control"
                            src="/static/editor.html"
                            id="iframe-editor">&nbsp;</iframe>
                </div>

                <div className="form-group">
                    <label htmlFor="form-tag">Tags</label>
                    <Typeahead
                        labelKey="name"
                        multiple={true}
                        options={tags}
                        defaultSelected={this.state.selectedTags ? this.state.selectedTags : []}
                        allowNew
                        onChange={(selectedTags) => {
                            this.setState({selectedTags});
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="form-state">State</label>
                    <select className="form-control"
                            name="currentState"
                            id="form-state"
                            value={this.state.currentState}
                            onChange={this.handleChange}>
                        {this.state.nodeStates.map(function (name, index) {
                            return <option key={name} value={name}>{name}</option>;
                        })}
                    </select>
                </div>

                {this.state.action === 'update' &&
                <button type="submit"
                        className="btn btn-primary"
                        onClick={this.updateNode}>Submit</button>
                }

                {this.state.action === 'create' &&
                <button type="submit"
                        className="btn btn-primary"
                        onClick={this.createNode}>Submit</button>
                }

                <style jsx>{`
                iframe {
                    min-height: 50rem;
                }
                `}</style>

            </div>
        );
    }

}
