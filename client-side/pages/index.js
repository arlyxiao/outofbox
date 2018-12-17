import React from 'react'
import Link from 'next/link'

import Layout from './layout/main';

import WrapAxios from '../service/axios';

const site = require('../site')();
const menus = site['menus'];


export default class extends React.Component {

    static async getInitialProps(context) {
        const nonCoverArticles = await WrapAxios.get(`/moon/home/nodes?type=non_cover_text`);
        const coverArticles = await WrapAxios.get(`/moon/home/nodes?type=cover_text`);
        const sharedVideos = await WrapAxios.get(`/moon/home/nodes?type=shared-video`);

        return {
            nonCoverArticles: nonCoverArticles.data,
            coverArticles: coverArticles.data,
            sharedVideos: sharedVideos.data
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            nonCoverArticles: props.nonCoverArticles,
            coverArticles: props.coverArticles,
            sharedVideos: props.sharedVideos
        };
    }

    componentDidUpdate(prevProps) {
    }


    render() {
        return (
            <Layout title="">

                <div className="main">

                    <div className="row section article-list">

                        <div className="p-3 bg-white rounded box-shadow section">
                            <Link as={`/search?type=text`}
                                  href={`/search?type=text`}>
                                <a className="btn btn-sm btn-secondary">
                                    &gt; 更多您可能感兴趣的文章
                                </a>
                            </Link>

                            <div className="row">

                                <div className="col-sm-5 non-cover-articles">
                                    {this.state.nonCoverArticles.results.map((item, i) => {
                                        return (
                                            <section className="media text-muted pt-3" key={item.created_at}>
                                                <div className="media-body mb-0 small lh-125 border-bottom border-gray">

                                                    <Link as={`/${item.channel_name}-${item.id}`}
                                                          href={`/show?id=${item.id}`}>
                                                        <a className="node-title">
                                                            {item.title}
                                                        </a>
                                                    </Link>
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
                                            </section>
                                        );
                                    })}
                                </div>

                                <div className="col-sm-7 cover-articles">


                                    {this.state.coverArticles.results.map((item, i) => {
                                        return (
                                            <section className="media text-muted pt-3" key={item.created_at}>
                                                <Link as={`/${item.channel_name}-${item.id}`}
                                                          href={`/show?id=${item.id}`}>
                                                    <img className="mr-2 rounded"
                                                         alt={item.title}
                                                         title={item.title}
                                                         src={item.cover}/>
                                                </Link>
                                                <div className="media-body mb-0 small lh-125 border-gray">

                                                    <Link as={`/${item.channel_name}-${item.id}`}
                                                          href={`/show?id=${item.id}`}>
                                                        <a className="node-title">
                                                            <strong className="text-gray-dark">{item.title}</strong>
                                                        </a>
                                                    </Link>
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
                                            </section>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="row section video-list">

                        <Link as={`/search?type=shared-video`}
                              href={`/search?type=shared-video`}>
                            <a className="btn btn-sm btn-secondary">
                                &gt; 更多您可能感兴趣的视频
                            </a>
                        </Link>

                        {this.state.sharedVideos.results.map((item, i) => {
                            return (
                                <div className="col-sm-2" key={item.created_at}>
                                    <div className="card">
                                        <div className="card-body">
                                            <Link as={`/${item.channel_name}-${item.id}`}
                                                  href={`/show?id=${item.id}`}>
                                                <img src={item.cover}
                                                     title={item.title ? item.title : item.intro}
                                                     alt={item.title ? item.title : item.intro}/>
                                            </Link>


                                            <p className="card-text">
                                                <Link as={`/${item.channel_name}-${item.id}`}
                                                      href={`/show?id=${item.id}`}>
                                                    <a className="node-title">
                                                        <strong
                                                            className="d-block text-gray-dark">{item.title}</strong>
                                                    </a>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </div>

                <style jsx>{`
                .main {
                    padding: 1rem;
                }

                .article-list {
                    img {
                        width: 3.5rem;
                        height: 3.5rem;
                        cursor: pointer;
                    }
                }

                `}</style>


            </Layout>
        );
    }
}

