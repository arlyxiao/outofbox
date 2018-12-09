import React from 'react'


export default class Footer extends React.Component {

    render() {
        return (
            <div>
                <footer className="py-5 bg-dark">
                    <div className="container">
                        <p className="m-0 text-center text-white">Copyright &copy;</p>
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
