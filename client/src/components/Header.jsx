import Avatar from 'components/Avatar';
import Layers from 'components/Layers';
import SearchLine from 'components/SearchLine';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import ModalStore from 'store/ModalStore';

const Header = () => {
    const userStore = useContext(Context);

    return (
        <div className='bg-white d-flex justify-content-between align-items-center px-3 header'>
            <span>
                <SearchLine />
                <Layers />
            </span>
            {userStore.isAuth ?
                <span>
                    <strong className="me-2">{userStore.user?.username}</strong>
                    <Avatar size={40} onClick={() => ModalStore.showProfile(true)} />
                </span>
                :
                <button className='btn border border-2 border-primary text-primary' onClick={() => ModalStore.showLogin(true)}>Войти</button>}
        </div>
    );
}

export default observer(Header);
