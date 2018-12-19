import React from 'react'
import Link from 'next/link'
import {withRouter} from 'next/router'


export default withRouter(class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linkClickTime: props.linkClickTime,
            tags: props.tags,
            nodeTags: props.nodeTags === undefined ? [] : props.nodeTags,
            channelId: props.channelId
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.linkClickTime !== prevProps.linkClickTime) {
            this.setState({
                tags: this.props.tags,
                nodeTags: this.props.nodeTags === undefined ? [] : this.props.nodeTags,
                channelId: this.props.channelId
            });
        }
    }


    render() {
        const channelId = this.state.channelId;
        const {pathname, query} = this.props.router;
        const nodeTags = this.state.nodeTags;
        const currentTag = query.tag ? query.tag : '';

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
                            let tag = item[0];
                            let style = (currentTag.toString() === tag.toString() || nodeTags.includes(tag)) ? 'btn btn-info btn-sm' : '';
                            return (
                                <Link key={item[0]}
                                      as={`/${item[2]}/tag/${tag}`}
                                      href={`/taxon?id=${channelId}&tag=${tag}`}>
                                    <a className="dropdown-item">
                                        &gt;&nbsp;
                                        <span className={style}>{item[1]}</span>
                                    </a>
                                </Link>
                            );
                        })}
                    </div>

                    <style jsx>{`
                    @media (max-width: 576px) {
                        #sidebar {
                            display: none;
                        }
                    }
                    `}</style>
                </div>
            );
        }

    }
})
