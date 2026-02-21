import type { VariantProps } from "class-variance-authority";
import type { ButtonVariantsType } from "./components/buttonVariants"



//TYPES FOR DATA STRUCTURES

export type AddDigitAction = {
    type: "ADD_DIGIT"; // alleen deze exacte waarde is toegestaan
    payload: {
        digit: string
    }
  }

export type ChooseOperatorAction = {
    type: "CHOOSE_OPERATION";
    payload: {
        operation: string
    }
}

export type ClearAction = {
    type: "CLEAR"
    payload: {
        operation: string
    }
}

export  type EvaluateAction = {
    type: "EVALUATE";
    payload: {
        operation: string
    }
  }

export  type ActionType = AddDigitAction | ChooseOperatorAction | ClearAction | EvaluateAction


// TYPES FOR PROPS

export type DisplayProps = {
    currentOperand: string | null
    previousOperand: string | null
    operation?: string | null
    formatOperand: (operand: string | null) => string | undefined
}

export type ContainerProps = {
    children: React.ReactNode
}

export type RowProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<ButtonVariantsType>;


//TYPES FOR STATE

export type CalculatorState = {
    currentOperand: string | null
    previousOperand: string | null
    operation: string | null
    overwrite: boolean
  }

  //TYPES FOR FUNCTIONS

  export type CalculatorOperands = {
    currentOperand: string | null;
    previousOperand: string | null;
    operation: string | null;
  };