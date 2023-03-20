import { useNavigate } from "react-router-dom";
import './Paginator.css';

const PageItem = ({ text, active, onClick }) => {
    const className = active ? " page-my-active text-white" : " page-my text-secondary";
    return (
        <div className={"page-item mx-1" + className}>
            <a className={"page-link" + className} onClick={onClick} role="button">{text}</a>
        </div>
    );
}

const Paginator = ({ pageCount, currnetPage, prefix }) => {
    const navigate = useNavigate();
    const selectPage = (pageId) => {
        if (pageId == 1) {
            navigate(prefix);
        } else {
            navigate(prefix + "/page/" + pageId);
        }
    }

    return (
        <ul className="pagination justify-content-center mb-2">
            {currnetPage > 1 && <PageItem text={"Назад"} onClick={() => selectPage(currnetPage - 1)} />}
            <PageItem text={"1"} active={currnetPage === 1} onClick={() => selectPage(1)} />
            {currnetPage > 3 && <span className="page-item page-link page-my text-secondary">...</span>}
            {currnetPage > 2 && <PageItem text={currnetPage - 1} active={false} onClick={() => selectPage(currnetPage - 1)} />}
            {currnetPage > 1 && currnetPage < pageCount && <PageItem text={currnetPage} active={true} onClick={() => selectPage(currnetPage)} />}
            {currnetPage < pageCount - 1 && <PageItem text={currnetPage + 1} active={false} onClick={() => selectPage(currnetPage + 1)} />}
            {currnetPage < pageCount - 2 && <span className="page-item page-link page-my text-secondary">...</span>}
            {pageCount > 1 && <PageItem text={pageCount} active={currnetPage == pageCount} onClick={() => selectPage(pageCount)} />}
            {currnetPage < pageCount && <PageItem text={"Далее"} onClick={() => selectPage(currnetPage + 1)} />}
        </ul>
    );
}

export default Paginator;
