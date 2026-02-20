import "../App.css";
import type { ContainerProps } from "../types"

function Container({ children }: ContainerProps) {


    return (
    <div className="container">
        {children}
    </div>
    );
  }


  export default Container;
  