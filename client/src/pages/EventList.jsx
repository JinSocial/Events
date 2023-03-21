import Header from "components/Header";
import EventCard from "components/EventCard";
import Paginator from "components/Paginator";
import { observer } from "mobx-react-lite";
import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EventStore from "store/EventStore";

const EventList = ({ page }) => {
    let { id } = useParams();
    if (page === undefined) {
        page = parseInt(id);
    }

    useEffect(() => {
        var fetch = async () => EventStore.fetchEventList(page);
        fetch();
    }, [page]);

    if (isNaN(page)) {
        return <NotFound />
    }

    if (!EventStore.eventList) {
        return <></>
    }

    return (
        <div id="main">
            <Header />
            <div className="w-75 mx-auto my-4">
                <div className="row row-cols-auto justify-content-center">
                    {EventStore.eventList.map(event => <EventCard event={event} key={event.id} />)}
                </div>
                <Paginator pageCount={EventStore.pageCount} currnetPage={page} prefix="/event" />
            </div>
        </div>
    );
}

export default observer(EventList);
