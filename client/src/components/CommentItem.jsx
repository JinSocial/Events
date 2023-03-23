import Avatar from "components/Avatar";
import ModalStore from "store/ModalStore";
import { timeformatter } from "utils/utils";

const CommentItem = ({ comment }) => {
    return (
        <div className="vstack d-flex p-1 align-items-start">
            <div className="d-flex align-items-center">
                <Avatar size={25} onClick={() => ModalStore.showProfile(true, comment.user)} />
                <b className="ms-1">{comment.user.login}</b>
            </div>
            <div>{comment.message}</div>
            <div className="text-secondary d-flex align-items-center">
                {timeformatter.format(new Date(comment.date))}
            </div>
        </div>
    );
}

export default CommentItem;