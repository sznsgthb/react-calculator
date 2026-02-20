import { useReducer } from "react";
import Button from "./components/Button";
import Container from "./components/Container";
import Display from "./components/Display";
import Row from "./components/Row"
import "./App.css";
import type { CalculatorState, ActionType, CalculatorOperands } from './types.ts'


const initialState: CalculatorState = {
    currentOperand: "0",
    previousOperand: null,
    operation: null,
    overwrite: true,
}


const theReducer = (state: CalculatorState, action: ActionType) : CalculatorState => {
    console.log("STATE:", state)
    console.log("ACTION:", action)
    // React will set the state to what you return from the reducer.
    switch (action.type) {
        case "ADD_DIGIT":
            // overschrijf de digit na het resultaat en bij initialState, anders worden de digits concatinated
            if (state.overwrite) {
                return {
                    ...state, //kopieer alles van de huidige state en plak in dit nieuwe state-object
                    currentOperand: action.payload.digit,
                    overwrite: false,
                }
            }
            if (state.currentOperand === "0" && action.payload.digit === "0"){  //moeten beide 'true' zijn, dan wordt de extra 0 genegeerd
                return state //oftewel verandert dus niets
            }
            // voeg niet meer dan 1 keer een decimaal toe
            if (action.payload.digit === "." &&                
                state.currentOperand !== null &&
                state.currentOperand.includes(".")){ 
                return state
            }
            return {
                ...state, 
                currentOperand:`${state.currentOperand || ""}${action.payload.digit}`,
            }

        case "CHOOSE_OPERATION":
            if (state.currentOperand === null && state.previousOperand === null){
                return state
            }
            if (state.previousOperand === null) {
                return {
                    ...state,
                    operation: action.payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: action.payload.operation,
                currentOperand: null
            }

        case "EVALUATE":
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ){
                return state
            }
            return {
                ...state,
                previousOperand: null,
                operation: null,
                overwrite:true,
                currentOperand: evaluate(state)
            }

        case "CLEAR":
            return initialState

    }
}

const evaluate = ({ currentOperand, previousOperand, operation } : CalculatorOperands) : string => {
 
    if (!currentOperand || !previousOperand || !operation) return "";
    // convert currentOperand and previousOperand to numbers with parseFloat
    const prev = parseFloat(previousOperand) 
    const current = parseFloat(currentOperand)
    
    if (isNaN(prev) || isNaN(current)) return ""

    let computation: number = 0;
    
    switch (operation) {
    case "+":
        computation = prev + current
        break
    case "-":
        computation = prev - current
        break
    case "*":
        computation = prev * current
        break
    case "/":
        computation = prev / current
        break
    }
    return computation.toString()
}

//formatting the entire number with ',' separator
const INTEGER_FORMATTER: Intl.NumberFormat = new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: 0,
})
//separate the decimal to can do : (exp 12.002) 
//and do not do any formatter to the decimal part (exp 77,777.5555555559)
function formatOperand(operand: string | null): string | undefined {
    if (operand == null) return //als operand null is, stop en geef niets terug
    const [integer, decimal] = operand.split(".") //als operand een punt bevat, splits in integer en decimal
    if (decimal == null) return INTEGER_FORMATTER.format(Number(integer)) //als er geen decimalen zijn, formatteer alleen integer en geef terug
    return `${INTEGER_FORMATTER.format(Number(integer))},${decimal}` //als er decimalen zijn, formatteer integer, plak decimal erachter met een komma en geef terug
}



function App() {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(theReducer, initialState)


    return (
        <div className="app">
            <Container>
                
                <Display currentOperand={currentOperand} previousOperand={previousOperand} operation={operation} formatOperand={formatOperand} />

                <Row>
                    <Button onClick={() => dispatch({ type : "CLEAR", payload: { operation: "AC" } })} variant="secondary">A/C</Button>
                    <Button variant="secondary"></Button>
                    <Button variant="secondary"></Button>
                    <Button onClick={() => dispatch({ type : "CHOOSE_OPERATION", payload: {operation: "/" }})}>÷</Button>
                </Row>

                <Row>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "7" } })} variant="tertiary">7</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "8" } })} variant="tertiary">8</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "9" } })} variant="tertiary">9</Button>
                    <Button onClick={() => dispatch({ type : "CHOOSE_OPERATION", payload: {operation: "*" }})}>×</Button>
                </Row>

                <Row>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "4" } })} variant="tertiary">4</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "5" } })} variant="tertiary">5</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "6" } })} variant="tertiary">6</Button>
                    <Button onClick={() => dispatch({ type : "CHOOSE_OPERATION", payload: {operation: "-" }})}>-</Button>
                </Row>

                <Row>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "1" } })} variant="tertiary">1</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "2" } })} variant="tertiary">2</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "3" } })} variant="tertiary">3</Button>
                    <Button onClick={() => dispatch({ type : "CHOOSE_OPERATION", payload: {operation: "+" }})}>+</Button>
                </Row>

                <Row>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "0" } })} variant="tertiary" span={1}>0</Button>
                    <Button onClick={() => dispatch({ type : "ADD_DIGIT", payload: { digit: "." } })} variant="tertiary">,</Button>
                    <Button onClick={() => dispatch({ type : "EVALUATE", payload: { operation: "=" } })}>=</Button>
                </Row>
                
            </Container>
        </div>
    );
}

export default App;

