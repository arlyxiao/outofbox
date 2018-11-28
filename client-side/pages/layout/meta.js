import React from 'react'
import Head from 'next/head'

import styles from '../../styles/main.scss'


export default class Meta extends React.Component {

    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                    <title>快码头 - 做最好的内容分享</title>
                    <meta name="description" content="您喜欢的, 想要的都在这里"/>
                    <meta name="viewport"
                          content="width=device-width, initial-scale=1, maximum-scale=1"/>

                    <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />

                    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
                          rel="stylesheet"/>
                </Head>

                <style jsx>{styles}</style>

                <style jsx global>{`
                `}</style>

            </div>
        );
    }
}
