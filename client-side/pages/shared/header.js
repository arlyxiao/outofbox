import React from 'react'
import Head from 'next/head'


export default class Header extends React.Component {

    render() {
        return (
            <div>
                <Head>
                    <title>League Table</title>

                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                    <meta name="description" content=""/>
                    <meta name="author" content=""/>

                    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                          rel="stylesheet"/>
                </Head>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <a className="navbar-brand" href="#">Start Bootstrap</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home
                                        <span className="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
