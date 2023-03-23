import Avatar from "components/Avatar";
import Header from "components/Header";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import UserStore from "store/UserStore";
import starImg from 'images/star.png';
import ModalStore from "store/ModalStore";

const Rating = () => {
    useEffect(() => {
        UserStore.fetchUsers();
    }, [])

    return (
        <div id="main">
            <Header />
            <div className="bg-light rounded mx-auto m-3 mb-4" style={{ maxWidth: "750px" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Пользователь</th>
                            <th scope="col">Рейтинг</th>
                            <th scope="col">Проекты</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserStore.users.slice().sort((a, b) => b.rating - a.rating).map((user, idx) =>
                            <tr key={idx + 1}>
                                <th scope="row">{idx + 1}</th>
                                <td>
                                    <Avatar size={20} onClick={() => ModalStore.showProfile(true, user)}/>
                                    <b className="ms-1">{user.login}</b>
                                </td>
                                <td className="d-flex align-items-center">
                                    <b className="fs-6 text-yellow me-1">{(Math.round(user.rating * 100) / 100).toFixed(2)}</b>
                                    <img src={starImg} width="15px" height="15px" />
                                </td>
                                <td>{user.projectMembers?.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default observer(Rating);
