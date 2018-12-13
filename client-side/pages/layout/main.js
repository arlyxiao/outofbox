import Link from 'next/link'

import Meta from "./meta";
import Footer from "./footer";
import LoginMenu from "./LoginMenu";

const site = require('../../site')();
const menus = site['menus'];


export default ({children, title = '', intro = '', channelId = ''}) => (
    <div>
        <Meta title={title} intro={intro}/>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark top-menu">
            <div className="container">
                <Link as={`/`} href={`/`}>
                    <a className="navbar-brand">
                        <img src={site['logo']} />
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto menu-taxon">
                        {Object.keys(menus).map((name, i) => {
                            let id = menus[name]['id'].toString();
                            let label = menus[name]['label'];
                            let style = id === channelId ? 'nav-link btn btn-secondary btn-sm active' : 'nav-link';
                            return (
                                <li className="nav-item" key={name}>
                                    <Link as={`/${name}`} href={`/taxon?id=${id}`}>
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

        <div className="jumbotron">
            <form className="form-inline container justify-content-end"
                  method="get"
                  action="/search">
                <input className="form-control mr-sm-2"
                       name="type"
                       placeholder="搜索您感兴趣的文章或视频"/>
                <button className="btn btn-secondary btn-sm my-2 my-sm-0"
                        type="submit">搜索
                </button>
            </form>
        </div>


        <div className="container main-body">

            {children}

        </div>

        <Footer/>

        <style jsx global>{`
        .top-menu a {
            font-size: 1.1rem;
        }

        .navbar-brand {
            img {
                width: 150px;
            }
        }

        .menu-taxon {
            margin-left: 1rem;
        }

        .jumbotron {
            padding: 1rem;
            margin-bottom: 0;
            overflow: hidden;

            form {
                input.form-control {
                    width: 18rem;
                    font-size: 0.9rem;
                }
            }
        }
        `}</style>

    </div>
)

