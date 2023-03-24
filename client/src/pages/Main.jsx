import Header from "components/Header";
import Maps from "components/Maps";
import CreateProjectOffcanvas from "components/CreateProjectOffcanvas";
import { useEffect } from "react";
import ProjectStore from "store/ProjectStore";
import Placemarks from "components/Placemarks";
import ProjectOffcanvas from "components/ProjectOffcanvas";

const Main = () => {
    useEffect(() => {
        setTimeout(() => ProjectStore.fetchProjects(), 2000);
    }, []);

    return (
        <div id="main" className="vstack">
            <Header />
            <div className="content">
                <Maps />
            </div>
            <CreateProjectOffcanvas />
            <ProjectOffcanvas />
            <Placemarks />
        </div>
    );
}

export default Main;
