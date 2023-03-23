import { ReactComponent as Search } from 'images/search.svg';
import { useState } from 'react';
import ProjectStore from 'store/ProjectStore';

const SearchLine = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    return (
        <form className={"rounded form-control p-1" + (error ? " is-invalid" : "")} style={{ background: "#eeeeee", fontSize: "0.8rem" }} onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); setError(!ProjectStore.search(value)) }}>
            <input className="border-0 shadow-none" style={{ background: "#eeeeee", outline: "none" }} placeholder="Поиск мест и адресов" value={value} onChange={(e) => setValue(e.target.value)} />
            <input type="submit" hidden />
            <Search role="button" onClick={() => setError(!ProjectStore.search(value))} />
        </form>
    );
}

export default SearchLine;
