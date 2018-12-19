import React from 'react'
import Head from 'next/head'

const site = require('../../site')();


export default class Meta extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                    <meta name="referrer" content="no-referrer"/>
                    <title>{this.props.title ? this.props.title : site['title']}</title>
                    <meta name="description"
                          content={this.props.intro ? this.props.intro : site['intro']}/>
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1, maximum-scale=1"/>

                    <link rel="shortcut icon" href={site['icon']} type="image/x-icon"/>

                    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
                          rel="stylesheet"/>

                    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                          rel="stylesheet"/>
                    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.slim.js"/>
                    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.min.js"/>

                </Head>

                <style jsx global>{`
                body {
                    background: #fefefe;
                    font-family: source sans pro,helvetica neue,Arial,sans-serif;
                }

                .main-body {
                  margin-bottom: 3rem;
                  overflow: hidden;
                }

                .media-body {
                    margin-bottom: 0.5rem;
                }

                .node-tip {
                    margin-bottom: 0.5rem;
                    margin-top: 0.5rem;

                    .time {
                        margin-right: 1rem;
                    }

                    a {
                        margin-right: 1rem;
                    }
                }

                #sidebar {
                    .dropdown-header {
                      font-weight: 600;
                      font-size: 1rem;
                      margin-top: 1rem;
                      color: #292226;
                    }

                    .dropdown-menu {
                      position: static;
                      display: block;
                      border: 0;

                      a {
                          font-weight: 500;
                        }
                    }

                    a.dropdown-item:active {
                        background-color: #fff;
                    }

                    a.dropdown-item:hover {
                        background-color: #fff;
                    }
                }

                .section {
                    width: 100%;

                    .card {
                        margin-bottom: 2rem;
                    }

                    .card-body {
                        padding: 0;
                        height: 15rem;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 11rem;
                            cursor: pointer;
                        }
                    }
                }

                .video-list {
                    padding: 1rem;

                    p {
                        padding: 0.5rem;
                    }

                    .node-title {
                        font-size: 0.9rem;
                    }
                }

                .node-title {
                    font-size: 1.1rem;
                    line-height: 1.1rem;
                    text-decoration: none;
                    color: rgba(37, 34, 40, 0.89);
                    display: inline-block;

                    &:hover {
                        text-decoration: none;
                    }
                }

                .node-intro {
                    font-size: 0.9rem;
                    color: #753128;
                    margin-bottom: 0.5rem;
                    margin-top: 0.5rem;
                }

                .node-content {
                    color: #653630;
                    font-size: 1.1rem;
                }
                `}</style>

            </div>
        );
    }
}
