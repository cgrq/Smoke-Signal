import "./SelectTeamField.css";


function SelectTeamField({ label, value, onChange, choices, placeholder }) {
    return (
        <>
            <div className="select-team-field-wrapper ">
                <label className="select-team-field-label">
                    {label}
                </label>
                <select
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="select-team-field clickable"
                >
                    <option disabled>{placeholder}</option>
                    {choices.map(choice => (
                        <option value={choice.id} key={choice.id}>
                            {choice.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectTeamField;
