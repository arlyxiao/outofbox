import React from 'react'
import axios from "axios/index";

import Sidebar from './layout/sidebar';
import Layout from './layout/main';


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? context.query.id : '';

        const node = await axios.get(`http://192.168.56.101:8000/moon/node/${id}?format=json`);
        const channelId = node.data.parent_id ? node.data.parent_id.toString() : '';
        const constants = await axios.get(`http://192.168.56.101:8000/moon/node/constants?format=json&id=${channelId}`);

        return {
            linkClickTime: +new Date(),
            channelId: channelId,
            node: node.data,
            tags: constants.data.tags,
            nodeTag: node.data.node_tag,
            id: id
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            linkClickTime: props.linkClickTime,
            channelId: props.channelId,
            node: props.node,
            tags: props.tags,
            nodeTag: props.nodeTag,
            id: props.id
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.linkClickTime !== prevProps.linkClickTime) {
            this.setState({
                linkClickTime: +new Date(),
                channelId: this.props.channelId,
                tags: this.props.tags,
                nodeTag: this.props.nodeTag,
                id: this.props.id,
                node: this.props.node
            });
        }
    }

    render() {
        const node = this.state.node;
        return (
            <Layout title={node.title}
                    intro={node.intro}
                    channelId={this.state.channelId}>

                <Sidebar tags={this.state.tags}
                         linkClickTime={this.state.linkClickTime}
                         nodeTag={this.state.nodeTag}
                         channelId={this.state.channelId}/>

                <div className="row col-lg-9">

                    <div className="my-3 p-3 bg-white rounded shadow-sm">

                        <p className="node-title"><b>{node.title}</b></p>
                        <p>
                            <small>{node.created_at}</small>
                        </p>
                        <div className="node-content"
                             dangerouslySetInnerHTML={{ __html: node.revision ? node.revision.body : '' }} />

                    </div>

                </div>

                <style jsx global>{`
                pre {
                    background-color: #d8d8dc;
                    color: #0f0101;
                    padding: 5px;
                }

                .shadow-sm {
                    width: 100%;
                }

                .node-title {
                    font-size: 1.2rem;
                }
                `}</style>


            </Layout>
        );
    }

}
