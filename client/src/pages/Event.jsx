import Header from "components/Header";
import { useParams } from "react-router-dom";

const Event = () => {
    let { id } = useParams();

    return (
        <div id="main">
            <Header />
            <div className="content">
                Событие {id}
            </div>
        </div>
    );
}

export default Event;
