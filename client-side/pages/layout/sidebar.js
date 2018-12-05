import React from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router'


export default withRouter(class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuClickTime: props.menuClickTime,
            tags: props.tags,
            nodeTag: props.nodeTag,
            channelId: props.channelId
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menuClickTime !== prevProps.menuClickTime) {
            this.setState({
                tags: this.props.tags,
                nodeTag: this.props.nodeTag,
                channelId: this.props.channelId
            });
        }
    }


    render() {
        const channelId = this.state.channelId;
        const {pathname, query} = this.props.router;
        const nodeTagId = this.state.nodeTag ? this.state.nodeTag['id'].toString() : '';
        const currentTag = query.tag ? query.tag.toString() : nodeTagId;

        if (this.state.tags.length === 0) {
            return null;
        } else {
            return (
                <div id="sidebar">
                    <div className="dropdown-menu">
                        {this.state.tags.length > 0 &&
                        <h2 className="dropdown-header">热门标签</h2>
                        }

                        {this.state.tags.map((item, i) => {
                            let tag = item[0].toString();
                            let style = currentTag === tag ? 'btn btn-secondary btn-sm' : '';
                            return (
                                <Link key={item[0]}
                                      as={`/${item[2]}/tag/${tag}`}
                                      href={`/index?id=${channelId}&tag=${tag}`}>
                                    <a className="dropdown-item">&gt; <span className={style}>{item[1]}</span></a>
                                </Link>
                            );
                        })}
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

                    #sidebar a.dropdown-item:active{
                        background-color: #fff;
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
})
