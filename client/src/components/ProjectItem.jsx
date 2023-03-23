import { useNavigate } from "react-router-dom";
import ModalStore from "store/ModalStore";
import { rolesMap } from "utils/utils";

const ProjectItem = ({ projectMember }) => {
    const navigate = useNavigate();
    const project = projectMember?.project;

    return (
        <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="me-2" onClick={() => { navigate(`/project/${project?.id}`); ModalStore.showProfile(false) }} role="button">{project?.title}</span>
            <span className="me-2">{rolesMap.get(projectMember.role)}</span>
            <span>{new Date(project?.creationDate?.toString()).toLocaleDateString("ru-RU")}</span>
        </div>
    );
}

export default ProjectItem;