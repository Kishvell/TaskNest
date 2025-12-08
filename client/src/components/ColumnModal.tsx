import { useState } from 'react';

type ColumnModalProps = {
  displayVisible: "none" | "block"
};

// Move the members state to the parent, then pass it and the setter down to the child.
export default function ColumnModal({displayVisible = "none"}: ColumnModalProps) {
    const [ columns, setColumns] = useState<string[]>([]);
    const [ newColumn, setNewColumn ] = useState<string>("");

    function addColumn(column: string) {
        setColumns(prev => {
            return [...prev, column]
        });

        setNewColumn("");
    }

    // To be removed afterwards
    console.log(columns);

    
    // CSS
    const modalStyle: React.CSSProperties = {
      display: displayVisible,
      position: "fixed",
      zIndex: 1,
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      overflow: "auto",
      backgroundColor: "rgba(0,0,0,0.4)",
    }

    return (
        <div className="modal" style={modalStyle}>
            <label htmlFor="columnTitle">Title</label>
            <input type="text" name="columnTitle" id="columnTitle" value={newColumn}/>

            <input type="button" value="Cancel" />
            <input type="button" value="Add Column" onClick={() => addColumn(newColumn)}/>
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