import React from 'react'
import Link from 'next/link'

import Layout from './layout/main';

import WrapAxios from '../service/axios';
import {tagBadge, channelBadge, titleLink} from '../components/NodeHelper';


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
            <Layout>
                <div className="p-3 bg-white rounded box-shadow hot-list">
                    <Link as={`/search?type=text`}
                          href={`/search?type=text`}>
                        <a className="indicator">
                            更多您可能感兴趣的文章 &gt;&gt;
                        </a>
                    </Link>

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
                                        {channelBadge(item)}
                                        {tagBadge(item)}
                                    </p>
                                </div>
                            </section>
                        );
                    })}

                    <div className="border-bottom gap">&nbsp;</div>

                    <Link as={`/search?type=shared-video`}
                          href={`/search?type=shared-video`}>
                        <a className="indicator">
                            更多您可能感兴趣的视频 &gt;&gt;
                        </a>
                    </Link>

                    {this.state.sharedVideos.results.map((item, i) => {
                        return (
                            <section className="media text-muted pt-3" key={item.created_at}>
                                <Link as={`/${item.channel_name}-${item.id}`}
                                          href={`/show?id=${item.id}`}>
                                    <img className="mr-2 rounded"
                                         alt={item.title}
                                         title={item.title}
                                         src={item.cover}/>
                                </Link>
                                <div className="media-body mb-0 small border-gray">

                                    <Link as={`/${item.channel_name}-${item.id}`}
                                          href={`/show?id=${item.id}`}>
                                        <a className="node-title">
                                            <strong className="text-gray-dark">{item.title}</strong>
                                        </a>
                                    </Link>
                                    <p className="node-tip">
                                        <span className="time">{item.created_at}</span>
                                        {channelBadge(item)}
                                        {tagBadge(item)}
                                    </p>
                                </div>
                            </section>
                        );
                    })}

                </div>

                <style jsx>{`
                .indicator {
                    color: #b16666;
                    font-weight: bold;
                    font-size: 1.1rem;
                    text-decoration: none;
                }

                .gap {
                    margin-bottom: 2rem;
                }

                .hot-list {
                    width: 60%;
                    margin: 0 auto;
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

