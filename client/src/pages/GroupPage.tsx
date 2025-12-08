import  MembersModal from "../components/MembersModal";
import ColumnModal from "../components/ColumnModal";
import CardModal from "../components/CardModal";
import AddButton from "../components/AddButton";

export default function GroupPage() {

    return (
        <>
        <div>
            <MembersModal />
            <AddButton buttonValue="Add Members"/>
        </div>
        <div>
            <ColumnModal />
            <AddButton buttonValue="Add Column"/>
        </div>
        <div>
            {/*Card Modal should be inside a column component */}
            <CardModal />
        </div>
        </>
        
    );
}