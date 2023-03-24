import Avatar from "components/Avatar";
import ModalStore from "store/ModalStore";
import { rolesMap } from "utils/utils";

const MemberItem = ({ member }) => {
    return (
        <div className="d-flex align-items-center justify-content-between mb-2">
            <span>
                <Avatar size={25} onClick={() => ModalStore.showProfile(true, member.user)}/>
                <b className="ms-1">{member.user.login}</b>
            </span>
            <b className="me-1">{rolesMap.get(member.role)}</b>
        </div>
    );
}

export default MemberItem;