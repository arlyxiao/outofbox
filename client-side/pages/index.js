import React from 'react'
import Link from 'next/link'
import axios from "axios/index";

import nookies from "nookies";

import Layout from './layout/main';


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? context.query.id.toString() : '';
        const tag = context.query.tag ? context.query.tag : '';

        const cookie = nookies.get(context);
        const token = cookie['your-id'];
        // const token = context.req.cookies;

        const nodes = await axios.get(`http://192.168.56.101:8000/moon/node/list?format=json&id=${id}&tag=${tag}`);
        const constants = await axios.get(`http://192.168.56.101:8000/moon/node/constants?format=json&id=${id}`);

        return {
            token: token,
            menuClickTime: +new Date(),
            nodeData: nodes.data,
            nodeList: nodes.data.results,
            tags: constants.data.tags,
            tag: tag,
            id: id
        }
    }

    constructor(props) {
        super(props);

        console.log('---')
        console.log(props.token)
        console.log('---')

        this.state = {
            token: props.token,
            menuClickTime: props.menuClickTime,
            next: props.nodeData.next === null ? '' : props.nodeData.next,
            nodeList: props.nodeList,
            tags: props.tags,
            tag: props.tag,
            id: props.id
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menuClickTime !== prevProps.menuClickTime) {

            console.log('===')
            console.log(this.props.token)
            console.log('===')

            this.setState({
                menuClickTime: this.props.menuClickTime,
                next: this.props.nodeData.next === null ? '' : this.props.nodeData.next,
                tags: this.props.tags,
                id: this.props.id,
                nodeList: this.props.nodeList
            });
        }
    }

    loadMore = () => {
        const next = this.state.next;
        if (next === null || next.trim() === '') {
            this.setState({
                next: '',
            });
            return;
        }

        const context = this;
        const currentList = this.state.nodeList;
        axios.get(next)
            .then(function (response) {
                const nodeList = currentList.concat(response.data.results);
                context.setState({
                    next: response.data.next,
                    nodeList: nodeList
                });
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            });
    };


    render() {
        return (
            <Layout title=""
                    tags={this.state.tags}
                    menuClickTime={this.state.menuClickTime}
                    channelId={this.state.id}>

                <main role="main" className="container">

                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-2 mb-0">
                            最近更新
                        </h6>

                        {this.state.nodeList.map((item, i) => {
                            return (
                                <p key={item.title + i}
                                   className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <Link as={`/${item.channel_name}-${item.id}`}
                                          href={`/show?id=${item.id}`}>
                                        <a className="node-title">
                                            <strong className="d-block text-gray-dark">&gt; {item.title}</strong>
                                        </a>
                                    </Link>
                                    {item.intro}
                                </p>
                            );
                        })}

                        <div className="row load-more">
                            <div className="col-12 text-center">
                                <input type="hidden" name="next" value={this.state.next}/>

                                {this.state.next !== '' &&
                                <button type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.loadMore}>加载更多...
                                </button>
                                }


                            </div>
                        </div>

                    </div>

                </main>

                <style jsx global>{`
                .load-more {
                    margin-top: 20px;
                }

                .node-title {
                    margin-top: 5px;
                    margin-bottom: 6px;
                    display: block;
                    color: rgba(37, 34, 40, 0.89);
                    font-size: 0.9rem;
                }

                .node-title:hover {
                    text-decoration: none;
                }
                `}</style>

            </Layout>
        );
    }

}

