// import { useState } from 'react';

type MyProps = {
    buttonValue: string;
    onClick: () => void;
};

// common template for the add button in "add column" and "add modal"
export default function AddButton({buttonValue, onClick}: MyProps) {
    return (
        // the function passed must toggle a variable state of display from "none" to "block"
        <input type="button" value={buttonValue} onClick={onClick}/>
    );
}