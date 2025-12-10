import AddButton from "./AddButton"
import CardGroupTask from "./CardGroupTask";
import { GroupColumnTask } from "../types/Task";

interface FunctionProp {
    onClick: () => void;
}

type GroupColumnTaskProp = GroupColumnTask & FunctionProp;

export default function ColumnGroupTask({ cards, title, onClick }: GroupColumnTaskProp) {
    return (
        <>
        <div >
            <h3>{title}</h3>
            {cards.length === 0 && "No Tasks"}
            {cards.map(card => {
                return (
                    <CardGroupTask {...card} title={card.title}/>
                )
            })}
            <AddButton buttonValue="Add Card" onOpen={onClick}/>
        </div>
        </>
    );
}