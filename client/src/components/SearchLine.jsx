import { ReactComponent as Search } from 'images/search.svg';

const SearchLine = () => {
    const search = () => {}

    return (
        <span className="rounded p-2 me-2" style={{background: "#eeeeee"}}>
            <input className="border-0 shadow-none" style={{background: "#eeeeee", outline: "none"}} placeholder="Поиск мест и адресов"></input>
            <Search role="button" onClick={search}/>
        </span>
    );
}

export default SearchLine;
