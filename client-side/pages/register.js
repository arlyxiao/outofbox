import React from 'react'

import Layout from './layout/main';


export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <Layout>

                <p className="temp">目前暂时不对外开放注册, 请持续关注...</p>

                <style jsx global>{`
                .temp {
                    text-align: center;
                    font-size: 1.2rem;
                    margin: 6rem auto;
                    font-weight: bold;
                }
                `}</style>

            </Layout>
        );
    }

}
