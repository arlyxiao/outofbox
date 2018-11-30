import React from 'react'
import Link from 'next/link'


export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: props.tags,
            channelId: props.channelId
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.channelId !== prevProps.channelId) {
            this.setState({
                tags: this.props.tags,
                channelId: this.props.channelId
            });
        }
    }


    render() {
        return (
            <div id="sidebar">
                <div className="dropdown-menu">
                    <h2 className="dropdown-header">热门标签</h2>

                    {this.state.tags.map((item, i) => {
                        return (
                            <Link as={`/${item[2]}/${item[0]}`}
                                  href={`/index?id=${this.state.channelId}&tag=${item[0]}`}>
                                <a className="dropdown-item">&gt; {item[1]}</a>
                            </Link>
                        );
                    })}


                    {/*<Link as={`/node`} href={`/node`}>*/}
                        {/*<a className="dropdown-item">&gt; Node List</a>*/}
                    {/*</Link>*/}
                </div>

                <style jsx global>{`
                #sidebar .dropdown-header {
                  font-weight: 600;
                  font-size: 1rem;
                  margin-top: 13px;
                }

                #sidebar .dropdown-menu {
                  position: static;
                  display: block;
                  border: 0;
                }

                #sidebar .dropdown-menu a {
                  font-size: 0.9rem;
                  font-weight: 500;
                }

                .main-body {
                  margin-top: 30px;
                  margin-bottom: 50px;
                }
                `}</style>
            </div>
        );
    }
}
