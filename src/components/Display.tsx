import "../App.css";
import type { DisplayProps } from "../types"


function Display({ currentOperand, previousOperand, operation, formatOperand} : DisplayProps) {

    return (
        <div className="display">

            <div className="display-row">
                <div className="display-dot red" />
                <div className="display-dot orange" />
                <div className="display-dot green" />
            </div>

            <span className="display-value previous">  {previousOperand !== null ? formatOperand(previousOperand) : ""} {operation}</span>
            <div className="display-current-container">
                <span className="display-value current">{formatOperand(currentOperand)}</span>
            </div>
        </div>
    );
}
  
export default Display;