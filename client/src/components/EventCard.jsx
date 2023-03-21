import { useNavigate } from "react-router-dom";
import { timeformatter } from "utils/utils";

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    return (
        <div className="card m-2 p-0" style={{ width: '30rem' }}>
            <a href={`/event/${event.id}`} onClick={() => navigate(`/event/${event.id}`)} className="text-white">
                <img className="card-img" src={event.image} alt={event.title} />
                <div className="card-img-overlay d-flex flex-column">
                    <div className="card-title">
                        <strong>{event.title}</strong>
                        <span className="fs-6"> • {timeformatter.format(event.date)}</span>
                    </div>
                    <div className="card-text mt-auto">
                        {event.text}
                    </div>
                </div>
            </a>
        </div>
    );
}

export default EventCard;