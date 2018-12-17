import React from 'react'
import Link from 'next/link'

import Layout from './layout/main';

import WrapAxios from '../service/axios';
const site = require('../site')();
const menus = site['menus'];


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
            <Layout title="">

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

                <div className="row col-lg-9 search-list">

                    <div className="my-3 p-3 bg-white rounded col-sm-12">

                        {type !== 'shared-video' &&
                            nodes.map((item, i) => {
                                return (
                                    <div key={item.created_at}
                                         className="media-body mb-0 small lh-125 border-bottom border-gray">
                                        <Link as={`/${item.channel_name}-${item.id}`}
                                              href={`/show?id=${item.id}`}>
                                            <a className="node-title">
                                                <strong className="d-block text-gray-dark">{item.title}</strong>
                                            </a>
                                        </Link>
                                        <p className="node-intro">{item.intro}</p>
                                        <p className="node-tip">
                                            <span className="time">{item.created_at}</span>
                                            <Link as={`/${item.channel_name}`}
                                              href={`/taxon?id=${item.parent_id}`}>
                                                <a className="node-title">
                                                    <span className="badge badge-secondary">
                                                        {menus[item.channel_name]['label']}
                                                    </span>
                                                </a>
                                            </Link>

                                            {item.tags[0] &&
                                            <Link as={`/${item.channel_name}/tag/${item.tags[0]['id']}`}
                                                  href={`/taxon?id=${item.parent_id}&tag=${item.tags[0]['id']}`}>
                                                <a className="node-title">
                                                    <span className="badge badge-info">
                                                        {item.tags[0]['name']}
                                                    </span>
                                                </a>
                                            </Link>
                                            }
                                        </p>
                                    </div>
                                );
                            })
                        }

                        <div className="row section video-list">
                            {type === 'shared-video' &&
                                nodes.map((item, i) => {
                                    return (
                                        <div className="col-sm-3" key={item.created_at}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <Link as={`/${item.channel_name}-${item.id}`}
                                                          href={`/show?id=${item.id}`}>
                                                        <img src={item.cover} alt={item.title ? item.title : item.intro}/>
                                                    </Link>


                                                    <p className="card-text">
                                                        <Link as={`/${item.channel_name}-${item.id}`}
                                                              href={`/show?id=${item.id}`}>
                                                            <a className="node-title">
                                                                <strong
                                                                    className="text-gray-dark">{item.title}</strong>
                                                            </a>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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


                <style jsx>{`
                    .search-list {
                        margin-top: 1rem;
                    }

                    .node-title {
                        margin-top: 5px;
                        margin-bottom: 6px;
                    }

                    .load-more {
                        margin-top: 1.5rem;
                    }

                    `}</style>


            </Layout>
        );
    }
}

