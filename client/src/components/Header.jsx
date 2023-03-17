import Avatar from 'components/Avatar';
import Layers from 'components/Layers';
import SearchLine from 'components/SearchLine';
import { Context } from 'index';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import ModalStore from 'store/ModalStore';

const Header = () => {
    const userStore = useContext(Context);

    const avatarAction = () => {
        if (userStore.isAuth) {
            //modalStore.showProfile(true);
        } else {
            //modalStore.showLogin(true);
        }
    }

    return (
        <header className='bg-white p-2 d-flex justify-content-between align-items-center'>
            <span>
                <SearchLine />
                <Layers />
            </span>
            {userStore.isAuth ?
            <Avatar /> :
            <button className='btn border border-2 border-primary text-primary' onClick={() => ModalStore.showLogin(true)}>Войти</button>}
        </header>
    );
}

export default observer(Header);
