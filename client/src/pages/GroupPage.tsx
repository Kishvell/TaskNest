import { useState, useEffect } from "react"
import MembersModal from "../components/MembersModal";
import ColumnModal from "../components/ColumnModal";
import CardModal from "../components/CardModal";
import AddButton from "../components/AddButton";
import ColumnGroupTask from "../components/ColumnGroupTask";
import { GroupColumnTask } from "../types/Task";

export default function GroupPage() {
    const [groupTask, setGroupTask] = useState(() => {
        const localTasks = localStorage.getItem("GROUPTASKS");
        return localTasks ? JSON.parse(localTasks) as GroupColumnTask[] : [];
    })

    const [activeModal, setActiveModal] = useState<null | "memberModal" | "columnModal" | "cardModal">(null);

    useEffect(() => {
        localStorage.setItem("GROUPTASKS", JSON.stringify(groupTask));
    }, [groupTask])

    return (
        <>
        <div>
            <h1>Title</h1>
            <AddButton buttonValue="Add Members" onClick={() => setActiveModal("memberModal")}/>
        </div>
        <div>
            {/*div for all column tasks */}
            {groupTask.length === 0 && "No Tasks"}
            {groupTask.map(columns => {
                return(
                    <ColumnGroupTask {...columns} key={columns._id} title={columns.title} cards={columns.cards} onClick={() => setActiveModal("cardModal")}/>
                );
            })}
            <AddButton buttonValue="Add Column" onClick={() => setActiveModal("columnModal")}/>
        </div>
        <div>
            {/*div for modals */}
            {activeModal === "memberModal" && <MembersModal />}
            {activeModal === "columnModal" && <ColumnModal />}
            {activeModal === "cardModal" && <CardModal />}
        </div>
        </>
        
    );
}