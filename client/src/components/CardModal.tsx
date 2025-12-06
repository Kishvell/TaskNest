
export default function CardModal() {
    return (
        <div className="modal">
            <label htmlFor="cardTitle">Title</label>
            <input type="text" name="cardTitle" id="cardTitle" />

            <label htmlFor="cardDescription">Description</label>
            <input type="text" name="cardDescription" id="cardDescription" />

            {/*label for  */}
            <input type="button" value="Cancel" />
            <input type="button" value="Add Card" />
        </div>
    );
}