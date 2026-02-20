import "../App.css";
import type { RowProps } from "../types"

function Row({ children, ...props }: RowProps) {

    return (
        <div className="row" {...props}>
            {children}
        </div>
    );
}

export default Row;
