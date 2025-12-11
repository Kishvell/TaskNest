import { useState, useEffect } from "react"
import MembersModal from "../components/MembersModal";
import ColumnModal from "../components/ColumnModal";
import CardModal from "../components/CardModal";
import AddButton from "../components/AddButton";
import ColumnGroupTask from "../components/ColumnGroupTask";
import { GroupColumnTask, GroupCardTask, GroupUser } from "../types/Task";

export default function GroupPage() {
    const [groupMembers, setGroupMembers] = useState(() => {
        const localMembers = localStorage.getItem("GROUPMEMBERS");
        return localMembers ? JSON.parse(localMembers) as GroupUser[] : [];
    })

    const [groupTask, setGroupTask] = useState(() => {
        const localTasks = localStorage.getItem("GROUPTASKS");
        return localTasks ? JSON.parse(localTasks) as GroupColumnTask[] : [];
    })

    const [activeModal, setActiveModal] = useState<null | "memberModal" | "columnModal" | "cardModal">(null);

    useEffect(() => {
        localStorage.setItem("GROUPTASKS", JSON.stringify(groupTask));
    }, [groupTask])

    function addMember(memberId: string, memberName: string) {
        const memberExists: GroupUser[] = groupMembers.filter(member => member._id == memberId);
        if (memberExists.length != 0) {
            // should be replaced by an alert to the screen
            return console.log("member already exists!");
        }

        setGroupMembers(prev => {
            return [
                ...prev,
                {_id: memberId, name: memberName}
            ]
        })
    }

    function addColumn(newTitle: string, newFunc: (text: string) => void, funcArg: string){
        const inputTitle = newTitle;
        
        newFunc(funcArg);
        
        setGroupTask(prev => {
            return [
                ...prev,
                {_id: crypto.randomUUID(), title: inputTitle, cards: []}
            ]
        })
    }

    function addCard(
        newTitle: string, 
        newDescription: string, 
        clearTitleFunc: (text: string) => void, 
        clearDescFunc: (text: string) => void,
        clearFuncArg: string,
        colId: string
     ) {
        const inputTitle = newTitle;
        const inputDescription = newDescription;

        clearTitleFunc(clearFuncArg);
        clearDescFunc(clearFuncArg);

        const newCard: GroupCardTask = {_id: crypto.randomUUID(), title: inputTitle, description: inputDescription};
        setGroupTask(prevCols => {
            return prevCols.map(cols => {
                return (cols._id == colId) ?
                {
                    ...cols,
                    cards: [...cols.cards, newCard]
                } : cols;
            })
        })
     }

    return (
        <>
        <div>
            <h1>Title</h1>
            <AddButton buttonValue="Add Members" onOpen={() => setActiveModal("memberModal")}/>
        </div>
        <div>
            {/*div for all column tasks */}
            {groupTask.length === 0 && "No Tasks"}
            {groupTask.map(columns => {
                return(
                    <ColumnGroupTask {...columns} key={columns._id} title={columns.title} cards={columns.cards} onClick={() => setActiveModal("cardModal")}/>
                );
            })}
            <AddButton buttonValue="Add Column" onOpen={() => setActiveModal("columnModal")}/>
        </div>
        <div>
            {/*div for modals */}
            {activeModal === "memberModal" && <MembersModal onClose={() => setActiveModal(null)}/>}
            {activeModal === "columnModal" && <ColumnModal onClose={() => setActiveModal(null)} onAdd={addColumn}/>}
            {activeModal === "cardModal" && <CardModal onClose={() => setActiveModal(null)}/>}
        </div>
        </>
        
    );
}