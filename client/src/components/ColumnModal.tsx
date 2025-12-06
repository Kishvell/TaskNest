
export default function ColumnModal() {
    return (
        <div className="modal">
            <label htmlFor="columnTitle">Title</label>
            <input type="text" name="columnTitle" id="columnTitle" />

            <label htmlFor="columnDescription">Description</label>
            <input type="text" name="columnDescription" id="columnDescription" />

            <input type="button" value="Cancel" />
            <input type="button" value="Add Column" />
        </div>
    );
}