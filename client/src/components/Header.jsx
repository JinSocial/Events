import Avatar from 'components/Avatar';
import Layers from 'components/Layers';
import SearchLine from 'components/SearchLine';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalStore from 'store/ModalStore';

const Header = () => {
    const userStore = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className='bg-white d-flex justify-content-between align-items-center px-3 header'>
            <span>
                <SearchLine />
                <Layers />
            </span>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={() => navigate("/")}>Карта</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/event" onClick={() => navigate("/event")}>События</a>
                </li>
                <li  className="nav-item ms-3">
                    {userStore.isAuth ?
                        <Avatar size={40} onClick={() => ModalStore.showProfile(true)} username={userStore.user?.username} />
                        :
                        <button className='btn border border-2 border-primary text-primary' onClick={() => ModalStore.showLogin(true)}>Войти</button>}
                </li>
            </ul>
        </div>
    );
}

export default observer(Header);
