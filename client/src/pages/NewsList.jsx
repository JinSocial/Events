import Header from "components/Header";
import NewsCard from "components/NewsCard";
import Paginator from "components/Paginator";
import { observer } from "mobx-react-lite";
import NotFound from "pages/NotFound";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsStore from "store/NewsStore";

const NewsList = ({ page }) => {
    let { id } = useParams();
    if (page === undefined) {
        page = parseInt(id);
    }

    useEffect(() => {
        var fetch = async () => NewsStore.fetchNewsList(page);
        fetch();
    }, [page]);

    if (isNaN(page)) {
        return <NotFound />
    }

    if (!NewsStore.newsList) {
        return <></>
    }

    return (
        <div id="main">
            <Header />
            <div className="w-75 mx-auto my-4">
                <div className="row row-cols-auto justify-content-center">
                    {NewsStore.newsList.map(news => <NewsCard news={news} key={news.id} />)}
                </div>
                <Paginator pageCount={NewsStore.pageCount} currnetPage={page} prefix="/news" />
            </div>
        </div>
    );
}

export default observer(NewsList);
