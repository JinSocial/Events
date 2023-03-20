import Header from "components/Header";
import { useParams } from "react-router-dom";

const News = () => {
    let { id } = useParams();

    return (
        <div id="main">
            <Header />
            <div className="content">
                Новость {id}
            </div>
        </div>
    );
}

export default News;
