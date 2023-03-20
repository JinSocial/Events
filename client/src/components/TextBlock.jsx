const TextBlock = ({ img, title, text }) => {
    return (
        <div className="mt-2">
            <div className="mb-1">
                <img src={img} alt="" width="20px" height="20px" />
                <strong className="text-purple ms-2">{title}</strong>
            </div>
            <div>
                <strong>{text}</strong>
            </div>
        </div>
    );
}

export default TextBlock;