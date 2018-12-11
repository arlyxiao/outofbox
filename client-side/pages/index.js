import React from 'react'
import Link from 'next/link'

import Layout from './layout/main';

import WrapAxios from '../service/axios';
const wrapAxios = WrapAxios();


export default class extends React.Component {

    static async getInitialProps(context) {
        const articles = await wrapAxios.get(`/moon/home/nodes?type=text`);
        const sharedVideos = await wrapAxios.get(`/moon/home/nodes?type=shared-video`);

        return {
            articles: articles.data,
            sharedVideos: sharedVideos.data
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            articles: props.articles,
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

                        <div className="my-3 p-3 bg-white rounded box-shadow section">
                            <h5 className="border-bottom border-gray pb-2 mb-0">您可能感兴趣的文章</h5>

                            {this.state.articles.results.map((item, i) => {
                                return (
                                    <section className="media text-muted pt-3" key={item.created_at}>
                                        <img className="mr-2 rounded"
                                             src={item.cover}/>
                                        <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">

                                            <Link as={`/${item.channel_name}-${item.id}`}
                                                  href={`/show?id=${item.id}`}>
                                                <a className="node-title">
                                                    <strong className="d-block text-gray-dark">{item.title}</strong>
                                                </a>
                                            </Link>
                                            <p className="node-intro">{item.intro}</p>
                                        </div>
                                    </section>
                                );
                            })}

                            <small className="d-block text-right mt-3">
                                <Link as={`/search?type=text`}
                                      href={`/search?type=text`}>
                                    <a className="btn btn-sm btn-secondary">
                                        查看更多
                                    </a>
                                </Link>
                            </small>
                        </div>
                    </div>

                    <div className="row section video-list">

                            <h5>您可能感兴趣的视频</h5>


                            {this.state.sharedVideos.results.map((item, i) => {
                                return (
                                    <div className="col-sm-2" key={item.created_at}>
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
                                                                className="d-block text-gray-dark">{item.title}</strong>
                                                        </a>
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}


                            <small className="d-block text-right mt-3 col-sm-12">
                                <Link as={`/search?type=shared-video`}
                                      href={`/search?type=shared-video`}>
                                    <a className="btn btn-sm btn-secondary">
                                        查看更多
                                    </a>
                                </Link>
                            </small>
                    </div>


                </div>

                <style jsx>{`
                    h5 {
                        text-align: left;
                        width: 100%;
                        margin-bottom: 1rem;
                        font-size: 1rem;
                        font-weight: bold;
                    }

                    .article-list {
                        img {
                            width: 3rem;
                        }
                    }

                    `}</style>


            </Layout>
        );
    }
}

