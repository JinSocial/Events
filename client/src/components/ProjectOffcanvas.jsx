import { observer } from "mobx-react-lite";
import ModalStore from "store/ModalStore";
import ProjectStore from "store/ProjectStore";
import projectImg from 'images/project.png';
import { placemarkTypesSingle } from "utils/utils";
import MemberList from "components/MembersList";
import CommentList from "components/CommentsList";

const ProjectOffcanvas = () => {
    if (!ModalStore.isProjectOffcanvas) {
        return <></>
    }

    return (
        <div className="offcanvas offcanvas-start show" id="offcanvas" aria-labelledby="offcanvasLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel"><b>{ProjectStore.project.title}</b></h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Закрыть" onClick={() => ModalStore.showProjectOffcanvas(false)}></button>
            </div>
            <div className="offcanvas-body myscroll">
                <img src={projectImg} className="w-100" />
                <div>
                    <label className="col-form-label"><b>Описание</b></label>
                    <div>
                        {ProjectStore.project.description}
                    </div>
                </div>
                <div>
                    <label className="col-form-label"><b>Тип проекта:</b> {placemarkTypesSingle[ProjectStore.project.type - 1]}</label>
                </div>
                <div className="col-form-label"><b>Дата начала:</b> {new Date(ProjectStore.project.creationDate.toString()).toLocaleDateString("ru-RU")}</div>
                <div className="col-form-label"><b>Дата завершения:</b> {new Date().toLocaleDateString("ru-RU")}</div>
                <MemberList members={ProjectStore.project.projectMembers} />
                <CommentList comments={ProjectStore.project.comments} />
                <div className="d-flex flex-column justify-content-center mt-3">
                    <button type="submit" className="btn border border-2 border-primary text-primary mx-auto" onClick={() => ModalStore.setSuccess(true)}>Присоединится</button>
                </div>
                {ModalStore.success && <div className="success text-center mt-2">Поздравляем с присоединением к проекту</div>}
            </div>
        </div>
    );
}

export default observer(ProjectOffcanvas);