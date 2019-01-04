import React from 'react'
import Link from 'next/link'

import Layout from './layout/main';

import WrapAxios from '../service/axios';
import {channelBadge, titleLink, timeLabel} from '../components/NodeHelper';


export default class extends React.Component {

    static async getInitialProps(context) {
        const coverArticles = await WrapAxios.get(`/moon/home/nodes?type=cover_text`);
        const sharedVideos = await WrapAxios.get(`/moon/home/nodes?type=shared-video`);

        return {
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
        const coverArticles = this.state.coverArticles ? this.state.coverArticles.results : null;
        const sharedVideos = this.state.sharedVideos ? this.state.sharedVideos.results : null;

        return (
            <Layout>
                <div className="p-3 bg-white rounded box-shadow hot-list">
                    <Link as={`/search?type=text`}
                          href={`/search?type=text`}>
                        <a className="indicator">
                            您可能感兴趣的文章 &gt;&gt;
                        </a>
                    </Link>

                    {coverArticles &&
                    coverArticles.map((item, i) => {
                        return (
                            <section className="hidden-row media text-muted pt-3" key={item.created_at}>
                                <Link as={`/${item.channel_name}-${item.id}`}
                                      href={`/show?id=${item.id}`}>
                                    <img className="mr-2 rounded"
                                         alt={item.title}
                                         title={item.title}
                                         src={item.cover}/>
                                </Link>
                                <div className="media-body mb-0 small lh-125 border-gray">
                                    {titleLink(item)}
                                    <p className="node-tip">
                                        {channelBadge(item)}
                                    </p>
                                </div>
                            </section>
                        );
                    })
                    }

                    <div className="border-bottom gap">&nbsp;</div>

                    <Link as={`/search?type=shared-video`}
                          href={`/search?type=shared-video`}>
                        <a className="indicator">
                            您可能感兴趣的视频 &gt;&gt;
                        </a>
                    </Link>

                    {sharedVideos &&
                    sharedVideos.map((item, i) => {
                        return (
                            <section className="hidden-row media text-muted pt-3" key={item.created_at}>
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

                <style jsx>{`
                .indicator {
                    color: #b16666;
                    font-weight: bold;
                    font-size: 1.1rem;
                    text-decoration: none;
                }

                .hidden-row {
                    display: none;
                }

                .gap {
                    margin-bottom: 1.5rem;
                }

                .hot-list {
                    width: 60%;
                    margin: 0 auto;
                }

                .node-time {
                    margin-top: 0.2rem;
                    margin-bottom: 0;
                }

                .node-intro {
                    margin-top: 0.2rem;
                }

                @media (max-width: 576px) {
                    .hot-list {
                        width: 100%;
                        margin: 0 auto;
                    }
                }
                `}</style>
            </Layout>
        );
    }
}

