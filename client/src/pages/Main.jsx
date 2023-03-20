import Header from "components/Header";
import Maps from "components/Maps";

const Main = () => {
    return (
        <div id="main" className="vstack">
            <Header />
            <div className="content">
                <Maps />
            </div>
        </div>
    );
}

export default Main;
