import { GroupCardTask } from "../types/Task"

export default function CardGroupTask({ title }: GroupCardTask) {
    return (
        <div>
            <p style={{fontSize: "20px"}}>{title}</p>
        </div>
    );
}