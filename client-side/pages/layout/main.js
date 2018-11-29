import Meta from "./meta";
import Sidebar from "./sidebar";
import Link from 'next/link'
import Footer from "./footer";


export default ({children}) => (
    <div>
        <Meta/>

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
                        <li className="nav-item">
                            <Link as={`/science`} href={`/index?id=1`}>
                                <a className="nav-link">科技</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link as={`/software`} href={`/index?id=2`}>
                                <a className="nav-link">IT/软件</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link as={`/finance`} href={`/index?id=3`}>
                                <a className="nav-link">财经</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link as={`/wisdom`} href={`/index?id=4`}>
                                <a className="nav-link">哲理</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link as={`/education`} href={`/index?id=5`}>
                                <a className="nav-link">教育</a>
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="">登录</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">注册</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="container main-body">

            <div className="row">

                <Sidebar/>

                <div className="col-lg-9">
                    {children}
                </div>

            </div>

        </div>

        <Footer/>

    </div>
)
