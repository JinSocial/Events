import Avatar from "components/Avatar";
import { observer } from "mobx-react-lite";
import ModalStore from "store/ModalStore";
import historyImg from 'images/history.png';
import goalsImg from 'images/goals.png';
import needsImg from 'images/needs.png';
import wishesImg from 'images/wishes.png';
import fearsImg from 'images/fears.png';
import starImg from 'images/star.png';
import TextBlock from "components/TextBlock";
import { useCallback, useState } from "react";
import ProjectList from "components/ProjectList";
import UserStore from "store/UserStore";

const ProfileModal = () => {
    const [exitOffset, setExitOffset] = useState(0);

    const usernameRef = useCallback(node => {
        if (node !== null) {
            setExitOffset(-node.getBoundingClientRect().width / 2);
        }
    }, []);

    if (!ModalStore.isShowProfile) {
        return <></>
    }

    const isCurrentUser = UserStore.user.id && ModalStore.viewUser?.id === UserStore.user.id;
    const username = ModalStore.viewUser?.login;
    const projects = [{role: "Owner", project: {id: 1, title: "Проект 1", created: new Date()}}];
    //ModalStore.viewUser?.projectMembers;
    const rating = 4 + Math.random();
    const position = "Бизнес аналитик";
    const industry = "IT";
    const education = "Фулл стак бэкенд"
    const historyText = "Роман работает восемь часов в день в государственной компании. Являясь членом команды IT отдела он каждый день занимается самообучением и практикой обрабатывая огромное количество документов на протяжении десяти лет. Так как на каждом этапе своей работы он обязан вести деловой разговор с огромным количеством совершенно разных людей у него имеются развитые навыки коммуникации и управления.";
    const goalsText = "Вступить в команду волонтеров когда нибудь";
    const needsText = "Роман нуждается в идеальном состоянии улиц на маршруте дом работа и постоянная грамотная поддержка их в таком состоянии";
    const wishesText = "Роман хочет вступить в готовую команду волонтеров и желательно чтобы они его сами нашли и пригласили разработали за него план действий и сделали это грамотно";
    const fearsText = "Роман боится один приступить к работе боясь насмешек или осуждения. По той же причине он боится пойти познакомится с соседями и предложить им организовать команду.";

    return (
        <div>
            <div className="modal-backdrop opacity-50" />
            <div className="modal modal-lg show" style={{ display: "block" }} onClick={(e) => { if (e.target.classList.contains('modal')) ModalStore.showProfile(false) }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content px-4">
                        <div className="modal-header row py-3">
                            <div className="hstack px-0 col">
                                <Avatar size="100px" />
                                <div className="ms-4 fs-3 text-purple" ref={usernameRef}>
                                    <b>{username}</b>
                                    <button className="btn text-danger small-text p-1 position-relative"
                                        onClick={() => { UserStore.logout(); ModalStore.showProfile(false); }}
                                        hidden={!isCurrentUser}
                                        style={{ left: `${exitOffset}px`, top: "2.5em" }}>
                                        Выйти
                                    </button>
                                </div>
                                <b className={"fs-5 text-yellow me-1" + (isCurrentUser ? "" : " ms-3")}>{(Math.round(rating * 100) / 100).toFixed(2)}</b>
                                <img src={starImg} width="20px" height="20px" />
                            </div>
                            <div className="col px-0 row">
                                <div className="col-3 mx-1">
                                    <div className="text-purple mb-2"><strong>Должность</strong></div>
                                    <div><strong>{position}</strong></div>
                                </div>
                                <div className="col-3 mx-1">
                                    <div className="text-purple mb-2"><strong>Индустрия</strong></div>
                                    <div><strong>{industry}</strong></div>
                                </div>
                                <div className="col-3 mx-1">
                                    <div className="text-purple mb-2"><strong>Образование</strong></div>
                                    <div><strong>{education}</strong></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <TextBlock img={historyImg} title={"История"} text={historyText} />
                                    <ProjectList projectsMember={projects}/>
                                </div>
                                <div className="col">
                                    <TextBlock img={goalsImg} title={"Цели"} text={goalsText} />
                                    <TextBlock img={needsImg} title={"Потребности"} text={needsText} />
                                    <TextBlock img={wishesImg} title={"Желания"} text={wishesText} />
                                    <TextBlock img={fearsImg} title={"Страхи"} text={fearsText} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(ProfileModal);