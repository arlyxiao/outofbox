import React from 'react'
import Head from 'next/head'
import Link from 'next/link'


export default class Header extends React.Component {
    render() {
        return (
            <div>
                <Head>
                    <title>Management</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <meta name="description" content=""/>
                    <meta name="author" content=""/>

                    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                          rel="stylesheet"/>
                    <link rel="stylesheet" href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css" />

                </Head>


                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a href="/" className="navbar-brand">Front</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive"
                                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <Link as={`/manage/home`} href={`/manage/home`}>
                                        <a className="nav-link">Home</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link as={`/manage/node`} href={`/manage/node`}>
                                        <a className="nav-link">Node</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


            </div>
        );
    }
}
