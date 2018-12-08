import Link from 'next/link'

import Meta from "./meta";
import Footer from "./footer";
import Sidebar from "./sidebar";
import LoginMenu from "./LoginMenu";


const menus = () => {
    return {
        'science': {'id': 1, 'label': '科技'},
        'software': {'id': 2, 'label': 'IT/软件'},
        'finance': {'id': 3, 'label': '财经'},
        'wisdom': {'id': 4, 'label': '哲理'},
        'education': {'id': 5, 'label': '教育'}
    };
};


export default ({children, title = '', intro = '', tags = [], menuClickTime, channelId, nodeTag = ''}) => (
    <div>
        <Meta title={title} intro={intro}/>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link as={`/`} href={`/`}>
                    <a className="navbar-brand">FD</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {Object.keys(menus()).map((name, i) => {
                            let id = menus()[name]['id'].toString();
                            let label = menus()[name]['label'];
                            let style = id === channelId ? 'nav-link btn btn-secondary btn-sm active' : 'nav-link';
                            return (
                                <li className="nav-item" key={name}>
                                    <Link as={`/${name}`} href={`/index?id=${id}`}>
                                        <a className={style}>{label}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <LoginMenu/>

                </div>
            </div>
        </nav>

        <div className="container main-body">

            <div className="row">

                <Sidebar tags={tags}
                         menuClickTime={menuClickTime}
                         channelId={channelId}
                         nodeTag={nodeTag}/>

                <div className="col-lg-9">
                    {children}
                </div>

            </div>

        </div>

        <Footer/>

    </div>
)

