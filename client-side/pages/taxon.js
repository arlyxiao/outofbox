import React from 'react'
import axios from "axios/index";

import nookies from "nookies";

import Layout from './layout/main';
import Sidebar from './layout/sidebar';
import {titleLink} from '../components/NodeHelper';


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? context.query.id.toString() : '';
        const tag = context.query.tag ? context.query.tag : '';

        const cookie = nookies.get(context);
        const token = cookie['your-id'];
        // const token = context.req.cookies;

        const nodes = await axios.get(`/moon/node/list?id=${id}&tag=${tag}`);
        const constants = await axios.get(`/moon/node/constants?id=${id}`);

        return {
            token: token,
            linkClickTime: +new Date(),
            nodeData: nodes.data,
            nodeList: nodes.data.results,
            tags: constants.data.tags,
            tag: tag,
            id: id
        }
    }

    constructor(props) {
        super(props);

        // console.log('---')
        // console.log(props.token)
        // console.log('---')

        this.state = {
            token: props.token,
            linkClickTime: props.linkClickTime,
            next: props.nodeData.next === null ? '' : props.nodeData.next,
            nodeList: props.nodeList,
            tags: props.tags ? props.tags : [],
            tag: props.tag,
            id: props.id
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.linkClickTime !== prevProps.linkClickTime) {

            // console.log('===')
            // console.log(this.props.token)
            // console.log('===')

            this.setState({
                linkClickTime: +new Date(),
                next: this.props.nodeData.next === null ? '' : this.props.nodeData.next,
                tags: this.props.tags ? this.props.tags : [],
                id: this.props.id,
                nodeList: this.props.nodeList
            });
        }
    }

    loadMore = () => {
        const next = this.state.next;
        if (next === null || next === undefined) {
            return;
        }

        const instance = this;
        let data = this.state.nodeList;
        axios.get(next)
            .then(function (response) {
                data = data.concat(response.data.results);
                instance.setState({
                    next: response.data.next,
                    nodeList: data
                });
            })
            .catch(function (error) {
                // console.log(error);
            })
            .then(function () {
                // always executed
            });
    };


    render() {
        return (
            <Layout channelId={this.state.id}>

                <Sidebar tags={this.state.tags}
                         linkClickTime={this.state.linkClickTime}
                         channelId={this.state.id}/>

                {this.state.id &&
                <div className="row">

                    <div className="bg-white rounded main-section">
                        {this.state.nodeList.map((item, i) => {
                            return (
                                <div key={item.title + i}
                                   className="node-row border-bottom border-gray">
                                    {titleLink(item)}
                                    <p className="node-intro">{item.intro}</p>

                                    <p className="node-tip">
                                        <span className="time small">{item.created_at}</span>
                                    </p>
                                </div>
                            );
                        })}

                        <div className="row load-more">
                            <div className="col-12 text-center">
                                {this.state.next &&
                                <button type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.loadMore}>加载更多...
                                </button>
                                }


                            </div>
                        </div>

                    </div>

                </div>
                }


                <style jsx global>{`
                .node-title {
                    font-weight: bold;
                }

                .load-more {
                    margin-top: 1.5rem;
                }
                `}</style>

            </Layout>
        );
    }

}

