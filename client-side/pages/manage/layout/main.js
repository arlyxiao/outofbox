import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";


export default ({children}) => (
    <div>
        <Header />

        <div className="container main-body">

            <div className="row">

                <Sidebar />

                <div className="col-lg-9">
                    { children }
                </div>

            </div>

        </div>

        <Footer />
    </div>
)
