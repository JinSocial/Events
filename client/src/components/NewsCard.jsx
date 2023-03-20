import { useNavigate } from "react-router-dom";
import { timeformatter } from "utils/utils";

const NewsCard = ({ news }) => {
    const navigate = useNavigate();

    return (
        <div className="card m-2 p-0" style={{ width: '30rem' }}>
            <a href={`/news/${news.id}`} onClick={() => navigate(`/news/${news.id}`)} className="text-white">
                <img className="card-img" src={news.image} alt={news.title} />
                <div className="card-img-overlay d-flex flex-column">
                    <div className="card-title">
                        <strong>{news.title}</strong>
                        <span className="fs-6"> • {timeformatter.format(news.date)}</span>
                    </div>
                    <div className="card-text mt-auto">
                        {news.text}
                    </div>
                </div>
            </a>
        </div>
    );
}

export default NewsCard;