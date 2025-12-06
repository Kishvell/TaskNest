
export default function MembersModal() {
    return (
        <div className="modal">
            <label htmlFor="memberUsername">Member Username</label>
            <input type="text" name="memberUsername" id="memberUsername" />
            <input type="button" value="Cancel" />
            <input type="button" value="Add User" />
        </div>
    );
}