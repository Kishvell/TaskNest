// import { useState } from 'react';

type MyProps = {
    buttonValue: string;
};


// common template for the add button in "add column" and "add modal"
export default function AddButton({buttonValue}: MyProps) {

    // function to open modal onclick

    return (
        //missing onclick function
        <input type="button" value={buttonValue}/>
    );
}