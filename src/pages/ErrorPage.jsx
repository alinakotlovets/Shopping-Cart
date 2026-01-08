import {Link} from "react-router-dom";
import common from "../style/common.module.css"

const ErrorPage = () => {
    return (
        <div
            className={`${common.flex} ${common.flexCenter} ${common.flexColumn} ${common.with100} ${common.height100} ${common.padding040}`}>
            <h2>Oh no, this page doesn't exist!</h2>
            <Link to="/">
                You can go back to the home page by clicking here!
            </Link>
        </div>
    );
};

export default ErrorPage;
