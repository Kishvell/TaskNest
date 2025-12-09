import AddButton from "./AddButton"
import CardGroupTask from "./CardGroupTask";
import { GroupColumnTask } from "../types/Task";

export default function ColumnGroupTask({ cards, title }: GroupColumnTask) {
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
            <AddButton buttonValue="Add Card" onClick={() => null}/>
        </div>
        </>
    );
}