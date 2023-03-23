import CommentItem from "components/CommentItem";
import { useState } from "react";

const CommentList = ({ comments }) => {
    const [toggle, setToggle] = useState(true);

    if (!comments) {
        comments = [];
    }

    return (
        <div>
            <div className={"btn-group " + (toggle ? "dropup" : "dropdown")}>
                <h6 className="mt-1 dropdown-toggle" role="button" onClick={() => setToggle(!toggle)}>
                    <b>Комметарии <span className="text-secondary">{comments?.length}</span></b>
                </h6>
            </div>
            {toggle && comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
        </div>
    );
}

export default CommentList;