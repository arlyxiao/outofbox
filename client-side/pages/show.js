import React from 'react'

import WrapAxios from '../service/axios';

import Sidebar from './layout/sidebar';
import Layout from './layout/main';
import {headerMeta} from '../components/NodeHelper';


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? context.query.id : '';

        const node = await WrapAxios.get(`/moon/node/${id}?format=json`);
        const channelId = node.data.parent_id ? node.data.parent_id.toString() : '';
        const constants = await WrapAxios.get(`/moon/node/constants?format=json&id=${channelId}`);

        return {
            linkClickTime: +new Date(),
            channelId: channelId,
            node: node.data,
            tags: constants.data.tags,
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
            nodeTags: props.node.tags.map(tag => tag.id),
            id: props.id
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.linkClickTime !== prevProps.linkClickTime) {
            this.setState({
                linkClickTime: +new Date(),
                channelId: this.props.channelId,
                tags: this.props.tags,
                nodeTags: this.props.nodeTags,
                id: this.props.id,
                node: this.props.node
            });
        }
    }

    render() {
        const node = this.state.node;
        return (
            <Layout headerMeta={headerMeta(node)}
                    channelId={this.state.channelId}>

                <Sidebar tags={this.state.tags}
                         linkClickTime={this.state.linkClickTime}
                         nodeTags={this.state.nodeTags}
                         channelId={this.state.channelId}/>

                <div className="row">

                    <div className="bg-white rounded main-section">

                        <p className="node-title"><b>{node.title}</b></p>
                        <p>
                            <small>{node.created_at}</small>
                        </p>
                        <div className="node-content"
                             dangerouslySetInnerHTML={{ __html: node.video }} />

                        <div className="node-content"
                             dangerouslySetInnerHTML={{ __html: node.revision ? node.revision.body : '' }} />

                    </div>

                </div>

                <style jsx global>{`
                code, pre {
                    background-color: #d8d8dc;
                    color: #0f0101;
                    padding: 5px;
                    margin: 0.5rem 0 0.5rem 0;
                }

                .shadow-sm {
                    width: 100%;
                }

                .node-title {
                    font-size: 1.2rem;
                }

                .node-content {
                    p {
                        margin-bottom: 0.2rem;
                    }

                    iframe, embed {
                        width: 100%;
                        height: 35rem;
                    }
                }
                `}</style>


            </Layout>
        );
    }

}
