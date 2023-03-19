import Header from "components/Header";
import Maps from "components/Maps";
import { observer } from "mobx-react-lite";

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

export default observer(Main);
