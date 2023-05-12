import "./SelectField.css";


function SelectField({ label, value, onChange, choices, placeholder }) {
    return (
        <>
            <div>
                <label>
                    {label}
                </label>
                <select
                    value={value}
                    onChange={onChange}
                >
                    <option disabled>{placeholder}</option>
                    {choices.map(choice => (
                        <option>
                            choice
                        </option>
                    ))}
                </select>

            </div>
        </>
    )
}

export default SelectField;
