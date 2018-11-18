import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";


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
