import { useState } from 'react';

type CardModalProps = {
  displayVisible: "none" | "block"
};

// Move the members state to the parent, then pass it and the setter down to the child.
export default function CardModal({displayVisible = "none"}: CardModalProps) {
    const [ cards, setCards] = useState<string[][]>([]);
    const [ newCard, setNewCard ] = useState<string[]>([]);
    
    function addCard(cardTitle: string, cardDescription: string) {
        
        setNewCard([cardTitle, cardDescription]);

        setCards(prev => {
            return [...prev, newCard]
        });

        setNewCard([]);
    }

    const cardTitle = "";
    const cardDescription = "";

    // To be removed afterwards
    console.log(cards);

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
            <label htmlFor="cardTitle">Title</label>
            <input type="text" name="cardTitle" id="cardTitle" value={cardTitle}/>

            <label htmlFor="cardDescription">Description</label>
            <textarea name="cardDescription" id="cardDescription" rows={9} cols={50} value={cardDescription}/>

            {/*Need to add:
                - calendar?
                - members responsible for the card
            */}
            <input type="button" value="Cancel" />
            <input type="button" value="Add Card" onClick={() => addCard(cardTitle, cardDescription)}/>
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