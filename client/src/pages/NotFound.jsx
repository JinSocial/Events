import Header from "components/Header";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div id="main">
            <Header />
            <div className="d-flex align-items-center" style={{ height: "75vh" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">Страница не найдена</div>
                            <a className="btn btn-link" href="/" onClick={() => navigate(-1)}>Вернуться</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
