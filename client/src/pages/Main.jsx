import Header from "components/Header";
import Maps from "components/Maps";
import CreateProjectOffcanvas from "components/CreateProjectOffcanvas";

const Main = () => {
    return (
        <div id="main" className="vstack">
            <Header />
            <div className="content">
                <Maps />
            </div>
            <CreateProjectOffcanvas />
        </div>
    );
}

export default Main;
