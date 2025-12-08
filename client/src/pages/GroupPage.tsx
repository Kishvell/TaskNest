import  MembersModal from "../components/MembersModal";
import ColumnModal from "../components/ColumnModal";
import CardModal from "../components/CardModal";
import AddButton from "../components/AddButton";

export default function GroupPage() {

    return (
        <>
        <div>
            <MembersModal displayVisible="none" />
            <AddButton buttonValue="Add Members"/>
        </div>
        <div>
            <ColumnModal displayVisible="none"/>
            <AddButton buttonValue="Add Column"/>
        </div>
        <div>
            {/*AddButton for CardModal should be inside a column component */}
            <CardModal displayVisible="none"/>
            <AddButton buttonValue="Add Card"/>
        </div>
        </>
        
    );
}