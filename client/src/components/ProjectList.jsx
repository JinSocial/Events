import ProjectItem from "components/ProjectItem";
import { useState } from "react";

const ProjectList = ({ projectsMember }) => {
    const [toggle, setToggle] = useState(true);

    if (!projectsMember) {
        projectsMember = [];
    }

    console.log(projectsMember);

    return (
        <div className="mt-2">
            <div className={"btn-group " + (toggle ? "dropup" : "dropdown")}>
                <h6 className="mt-1 dropdown-toggle" role="button" onClick={() => setToggle(!toggle)}>
                    <b>Проекты <span className="text-secondary">{projectsMember.length}</span></b>
                </h6>
            </div>
            {toggle && projectsMember.map(projectMember => <ProjectItem key={projectMember.project.id} projectMember={projectMember} />)}
        </div>
    );
}

export default ProjectList;