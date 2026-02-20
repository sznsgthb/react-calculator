import { cva } from "class-variance-authority";

export const buttonVariants = cva("button", {
    variants: {
        variant: {
            primary: "primary",
            secondary: "secondary",
            tertiary: "tertiary",
        },
        span: {
            0: "span-0",
            1: "span-1",
        },
    },
    defaultVariants: {
        variant: "primary",
        span: 0,
    },
});

export type ButtonVariantsType = typeof buttonVariants;