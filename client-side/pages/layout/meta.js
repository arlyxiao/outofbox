import React from 'react'
import Head from 'next/head'

// import styles from '../../styles/main.scss'


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
                    <title>{this.props.title ? this.props.title : ''}</title>
                    <meta name="description" content={this.props.intro ? this.props.intro : ''} />
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1, maximum-scale=1"/>

                    <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />

                    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                          rel="stylesheet"/>
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                            crossOrigin="anonymous"></script>

                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                            crossOrigin="anonymous"></script>

                </Head>

                {/*<style jsx global>{styles}</style>*/}

                {/*<style jsx global>{`*/}
                {/*`}</style>*/}

            </div>
        );
    }
}
