import React from 'react'
import Link from 'next/link'

import Layout from './layout/main';

import WrapAxios from '../service/axios';
import {tagBadge, channelBadge, titleLink, timeLabel} from '../components/NodeHelper';


export default class extends React.Component {

    static async getInitialProps(context) {
        const type = context.query.type ? encodeURIComponent(context.query.type) : '';
        const nodes = await WrapAxios.get(`/moon/search/nodes?type=${type}`);

        return {
            linkClickTime: +new Date(),
            type: type,
            nodes: nodes.data.results,
            next: nodes.data.next
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            linkClickTime: props.linkClickTime,
            type: props.type,
            nodes: props.nodes,
            next: props.next,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.linkClickTime !== prevProps.linkClickTime) {
            this.setState({
                linkClickTime: +new Date(),
                type: this.props.type,
                nodes: this.props.nodes,
                next: this.props.next
            });
        }
    }

    loadMore = () => {
        const next = this.state.next;
        if (next === null || next === undefined) {
            return;
        }

        const instance = this;
        let data = this.state.nodes;

        WrapAxios.get(next)
            .then(function (response) {
                data = data.concat(response.data.results);
                instance.setState({
                    next: response.data.next,
                    nodes: data
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
        const btn = 'btn btn-secondary btn-sm';
        const nodes = this.state.nodes;
        const type = this.state.type;

        return (
            <Layout>

                <div id="sidebar">
                    <div className="dropdown-menu">
                        <h2 className="dropdown-header">分类</h2>

                        <Link as={`/search?type=text`}
                              href={`/search?type=text`}>
                            <a className="dropdown-item">
                                &gt; &nbsp;
                                <span className={this.state.type === 'text' ? btn : ''}>
                                    所有文章
                                </span>
                            </a>
                        </Link>

                        <Link as={`/search?type=shared-video`}
                              href={`/search?type=shared-video`}>
                            <a className="dropdown-item">
                                &gt; &nbsp;
                                <span className={this.state.type === 'shared-video' ? btn : ''}>
                                    所有视频
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="row">

                    <div className="bg-white rounded main-section">

                        {type !== 'shared-video' &&
                            nodes.map((item, i) => {
                                return (
                                    <div key={item.created_at}
                                         className="node-row border-bottom border-gray">
                                        {titleLink(item)}
                                        <p className="node-intro">{item.intro}</p>
                                        <p className="node-tip">
                                            {timeLabel(item)}
                                            {channelBadge(item)}
                                        </p>
                                    </div>
                                );
                            })
                        }

                        <div className="video-list">
                            {type === 'shared-video' &&
                                nodes.map((item, i) => {
                                    return (
                                        <section className="media text-muted" key={item.created_at}>
                                            <Link as={`/${item.channel_name}-${item.id}`}
                                                      href={`/show?id=${item.id}`}>
                                                <img className="mr-2 rounded"
                                                     alt={item.title}
                                                     title={item.title}
                                                     src={item.cover}/>
                                            </Link>
                                            <div className="media-body mb-0 small border-gray">
                                                {titleLink(item)}
                                                <p className="node-intro">{item.intro}</p>
                                                <p className="node-tip">
                                                    {timeLabel(item)}
                                                    {channelBadge(item)}
                                                </p>
                                            </div>
                                        </section>
                                    );
                                })
                            }
                        </div>

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


                <style jsx global>{`
                .node-title {
                    font-weight: bold;
                }

                .load-more {
                    margin-top: 1.5rem;
                }

                .video-list {
                    section {
                        margin-bottom: 1rem;
                    }
                }

                @media (max-width: 576px) {
                    #sidebar {
                        display: none;
                    }
                }
                `}</style>


            </Layout>
        );
    }
}

