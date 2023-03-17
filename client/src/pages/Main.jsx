import Header from "components/Header";
import Maps from "components/Maps";
import LoginModal from "components/modal/LoginModal";
import ProfileModal from "components/modal/ProfileModal";
import RegistrationModal from "components/modal/RegistrationModal";

const Main = () => {
    return (
        <div id="main" className="vstack">
            <Header />
            <div className="content">
                <Maps />
            </div>
            <LoginModal />
            <RegistrationModal />
            <ProfileModal />
        </div>
    );
}

export default Main;
