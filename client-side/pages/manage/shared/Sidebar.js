import React from 'react'
import Link from 'next/link'


export default class Sidebar extends React.Component {
    render() {
        return (
            <div id="sidebar">
                <div className="dropdown-menu">
                    <h6 className="dropdown-header">Node Management</h6>
                    <Link as={`/manage/node`} href={`/manage/node`}>
                        <a className="dropdown-item">&gt; Node List</a>
                    </Link>
                    <Link as={`/manage/node/new`} href={`/manage/node/new`}>
                        <a className="dropdown-item">&gt; Create Node</a>
                    </Link>
                </div>
            </div>
        );
    }
}
