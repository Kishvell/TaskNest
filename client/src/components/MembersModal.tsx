import { useState } from 'react';

type MembersModalProps = {
  displayVisible: "none" | "block"
};

// Move the members state to the parent, then pass it and the setter down to the child.
export default function MembersModal({ displayVisible = "none" }: MembersModalProps) {
    const [ members, setMembers] = useState<string[]>([]);
    const [ newMember, setNewMember ] = useState<string>("");

    function addMember(memberUsername: string) {
        setMembers(prev => {
            return [...prev, memberUsername]
        })

        setNewMember("");
    }

    // To be removed afterwards
    console.log(members);

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
            <label htmlFor="memberUsername">Member Username</label>
            <input type="text" name="memberUsername" id="memberUsername" value={newMember}/>
            <input type="button" value="Cancel" />
            <input type="button" value="Add User" onClick={() => addMember(newMember)}/>
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