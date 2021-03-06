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

                    <meta name="description"
                          content={this.props.headerMeta ? this.props.headerMeta.intro : site['intro']}/>
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1, maximum-scale=1"/>

                    <title>{this.props.headerMeta ? this.props.headerMeta.title : site['title']}</title>

                    <link rel="shortcut icon" href={site['icon']} type="image/x-icon"/>
                    <link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"
                          rel="stylesheet"/>
                    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                          rel="stylesheet"/>
                    <link rel='stylesheet' type='text/css' href="/static/nprogress.css" />

                    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.slim.js"/>
                    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.min.js"/>

                    {site['analytics'] &&
                    <script type="text/javascript" src="http://tajs.qq.com/stats?sId=66142729" charSet="UTF-8"></script>
                    }
                </Head>

                <style jsx global>{`
                body {
                    background: #f8f9fa;
                    font-family: source sans pro,helvetica neue,Arial,sans-serif;
                }

                .main-body {
                  margin-top: 3rem;
                  margin-bottom: 3rem;
                  overflow: hidden;
                  min-height: 30rem;
                }

                .main-section {
                    margin-left: 1rem;
                    padding: 1rem;
                    width: 100%;
                }

                .jumbotron {
                    padding: 0;
                }

                #sidebar {
                    .dropdown-header {
                      font-weight: 600;
                      font-size: 1rem;
                      color: #292226;
                    }

                    .dropdown-menu {
                      position: static;
                      display: block;
                      border: 0;
                      min-width: 11rem;

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

                .video-list, .hot-list {
                    img {
                        max-width: 3.5rem;
                        max-height: 3.5rem;
                        cursor: pointer;
                        margin-bottom: 1.5rem;
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

                .node-row {
                    margin-bottom: 0.5rem;
                }

                .node-type-badge {
                    margin-right: 0.5rem;
                }

                .node-tip {
                    margin-bottom: 0.5rem;
                    margin-top: 0.5rem;

                    .time {
                        margin-right: 0.5rem;
                        font-size: 0.8rem;
                    }

                    a {
                        margin-right: 1rem;
                    }
                }

                .node-intro {
                    font-size: 0.9rem;
                    color: #6c757d;
                    margin-bottom: 0.5rem;
                    margin-top: 0.5rem;
                }

                .node-content {
                    color: #653630;
                    font-size: 1.1rem;
                }

                @media (max-width: 576px) {
                    .main-section {
                        margin-left: 0;
                    }

                    .main-body {
                      margin-top: 1rem;
                    }
                }
                `}</style>

            </div>
        );
    }
}
