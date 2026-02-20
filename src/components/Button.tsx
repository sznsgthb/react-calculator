import "../App.css";
import type { ButtonProps } from "../types";
import { buttonVariants } from "./buttonVariants";



function Button({ children, span, onClick, variant, ...props }: ButtonProps) {

    return (
        <button onClick={onClick} className={buttonVariants({ span, variant })} {...props}>
            <span className="button-text">{children}</span>
        </button>
    );
}

export default Button;