import { useState } from 'react';
import "./GroupModal.css";

interface FunctionProp {
    onClose: () => void;
}

// Move the members state to the parent, then pass it and the setter down to the child.
export default function MembersModal({onClose}: FunctionProp) {
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

    return (
        <div className="modal">
            <label htmlFor="memberUsername">Member Username</label>
            <input type="text" name="memberUsername" id="memberUsername" value={newMember}/>
            <input type="button" value="Cancel" onClick={() => onClose()}/>
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