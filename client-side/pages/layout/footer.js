import React from 'react'

const site = require('../../site')();


export default class Footer extends React.Component {

    render() {
        return (
            <div>
                <footer className="py-5 bg-dark">
                    <div className="container">
                        <p className="m-0 text-center text-white">
                            {site['announce']}
                        </p>
                    </div>
                </footer>

                <style jsx>{`
                footer {
                    margin-top: 3rem;
                }
                `}</style>
            </div>
        );
    }
}
