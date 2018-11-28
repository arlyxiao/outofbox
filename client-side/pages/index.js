import React from 'react'

import Layout from './layout/main';
import axios from "axios/index";
import Router from "next/router";


export default class extends React.Component {

    static async getInitialProps(context) {
        const id = context.query.id ? 'id=' + context.query.id : '';
        const nodes = await axios.get(`http://192.168.56.101:8000/moon/node/list?${id}&format=json`);

        return {
            nodeList: nodes.data,
            queryId: id
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            next: props.nodeList.next === null ? '' : props.nodeList.next,
            nodeList: props.nodeList,
            queryId: props.query
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.queryId !== prevProps.queryId) {
            this.setState({
                next: this.props.nodeList.next === null ? '' : this.props.nodeList.next,
                nodeList: this.props.nodeList
            });
        }
    }

    loadMore = () => {
        const next = this.state.next;
        if (next === null || next.trim() === '') {
            this.setState({
                next: '',
            });
            return;
        }

        const context = this;
        axios.get(next)
            .then(function (response) {
                context.setState({
                    next: response.data.next,
                    nodeList: response.data
                });
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .then(function () {
                // always executed
            });
    }


    render() {
        const color1 = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16759f32b16%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16759f32b16%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23e83e8c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.890625%22%20y%3D%2216.8578125%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
        const color2 = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16759f32b16%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16759f32b16%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23e83e8c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.890625%22%20y%3D%2216.8578125%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
        const color3 = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16759f32b17%20text%20%7B%20fill%3A%236f42c1%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16759f32b17%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%236f42c1%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.890625%22%20y%3D%2216.8578125%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
        const colorList = [color1, color2, color3];
        return (
            <Layout>

                <main role="main" className="container">

                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-2 mb-0">最近更新</h6>

                        {this.state.nodeList.results.map((item, i) => {
                            const color = colorList[Math.floor(Math.random() * colorList.length)]
                            return (
                                <div className="media text-muted pt-3">
                                    <img data-src=""
                                         alt="32x32" className="mr-2 rounded"
                                         src={color}
                                         data-holder-rendered="true"/>
                                    <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                        <strong className="d-block text-gray-dark">&gt; {item.title}</strong>
                                        {item.revision ? item.revision.body : ''}
                                    </p>
                                </div>
                            );
                        })}

                        <div className="row load-more">
                            <div className="col-12 text-center">
                                <input type="hidden" name="next" value={this.state.next}/>

                                {this.state.next !== '' &&
                                    <button type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={this.loadMore}>加载更多...
                                    </button>
                                }


                            </div>
                        </div>

                    </div>

                </main>

                <style jsx>{`
                .load-more {
                    margin-top: 20px;
                }
                `}</style>

            </Layout>
        );
    }

}

