import Header from "components/Header";
import { observer } from "mobx-react-lite";
import NotFound from "pages/NotFound";
import projectImg from 'images/project.png';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectStore from "store/ProjectStore";
import MemberList from "components/MembersList";
import CommentList from "components/CommentsList";
import { placemarkTypesSingle } from "utils/utils";

const Project = () => {
    let { id } = useParams();

    useEffect(() => {
        ProjectStore.fetchProject(id);
    }, [id]);

    if (ProjectStore.isLoading) {
        return <></>
    }

    if (ProjectStore.project.id != id) {
        return <NotFound />
    }

    return (
        <div id="main">
            <Header />
            <div className="bg-light rounded mx-auto m-3 mb-4" style={{maxWidth: "750px"}}>
                <h2 className="p-3">{ProjectStore.project.title}</h2>
                <div className="d-flex justify-content-center">
                    <img src={projectImg} style={{ height: 400 }} />
                </div>
                <div className="mx-5">
                    <label className="col-form-label"><b>Описание</b></label>
                    <div>
                        {ProjectStore.project.description}
                    </div>
                </div>
                <div className="row mx-5">
                    <div className="col d-flex justify-content-start p-0">
                        <div>
                            <label className="col-form-label"><b>Тип проекта:</b> {placemarkTypesSingle[ProjectStore.project.type - 1]}</label>
                            <CommentList comments={ProjectStore.project.comments} />
                        </div>
                    </div>
                    <div className="col d-flex justify-content-end p-0">
                        <div>
                            <div className="col-form-label"><b>Дата начала:</b> {new Date(ProjectStore.project.creationDate.toString()).toLocaleDateString("ru-RU")}</div>
                            <div className="col-form-label"><b>Дата завершения:</b> {new Date().toLocaleDateString("ru-RU")}</div>
                            <MemberList members={ProjectStore.project.projectMembers} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(Project);
