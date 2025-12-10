import { useState } from 'react';
import "./GroupModal.css";

interface FunctionProp {
    onClose: () => void;
    onAdd: (title: string, someFunc: (someText: string) => void, text: string) => void;
}

// Move the members state to the parent, then pass it and the setter down to the child.
export default function ColumnModal({onClose, onAdd}: FunctionProp) {
    // const [ columns, setColumns] = useState<string[]>([]);
    const [ newColumn, setNewColumn ] = useState<string>("");


    // {OLD CODE, COULD BE USED FOR REFERENCE}
    // function addColumn(column: string) {
    //     setColumns(prev => {
    //         return [...prev, column]
    //     });

    //     setNewColumn("");
    // }

    return (
        <div className="modal">
            <label htmlFor="columnTitle">Title</label>
            <input type="text" name="columnTitle" id="columnTitle" value={newColumn}/>

            <input type="button" value="Cancel" onClick={() => onClose()}/>
            <input type="button" value="Add Column" onClick={() => onAdd(newColumn, setNewColumn, "")}/>
        </div>
    );
}

/* 
//Sample solution by ChatGpt:
// Parent
function Parent() {
  const [members, setMembers] = useState<string[]>([]);

  const addMember = (username: string) => {
    setMembers(prev => [...prev, username]);
  };

  return <Child members={members} addMember={addMember} />;
}

// Child
type ChildProps = {
  members: string[];
  addMember: (username: string) => void;
};

function Child({ members, addMember }: ChildProps) {
  return (
    <div>
      <button onClick={() => addMember("Alice")}>Add</button>
      {members.map(m => (
        <div key={m}>{m}</div>
      ))}
    </div>
  );
}
*/