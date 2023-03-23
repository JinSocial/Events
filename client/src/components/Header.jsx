import Avatar from 'components/Avatar';
import SearchLine from 'components/SearchLine';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import ModalStore from 'store/ModalStore';
import UserStore from 'store/UserStore';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-white d-flex justify-content-between align-items-center px-3 header'>
            <span>
                <SearchLine />
            </span>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={() => navigate("/")}>Карта</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/event" onClick={() => navigate("/event")}>События</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/rating" onClick={() => navigate("/rating")}>Рейтинг</a>
                </li>
                <li  className="nav-item ms-3">
                    {UserStore.isAuth ?
                        <Avatar size={40} onClick={() => {ModalStore.showProfile(true, UserStore.user)}} username={UserStore.user?.login} />
                        :
                        <button className='btn border border-2 border-primary text-primary' onClick={() => ModalStore.showLogin(true)}>Войти</button>}
                </li>
            </ul>
        </div>
    );
}

export default observer(Header);
