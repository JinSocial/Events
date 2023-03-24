import MemberItem from "components/MemberItem";
import { useState } from "react";

const MemberList = ({ members }) => {
    const [toggle, setToggle] = useState(true);

    if (!members) {
        members = [];
    }

    return (
        <div>
            <div className={"btn-group " + (toggle ? "dropup" : "dropdown")}>
                <h6 className="mt-1 dropdown-toggle" role="button" onClick={() => setToggle(!toggle)}>
                    <b>Участники <span className="text-secondary">{members?.length}</span></b>
                </h6>
            </div>
            {toggle && members.map(member => <MemberItem key={member.user.id} member={member} />)}
        </div>
    );
}

export default MemberList;