import "./InputField.css";

function InputField({ label, value, onChange, placeholder, required }) {
  return (
    <>
      <div>
        <label>{label}</label>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          required={required}
        />
      </div>
    </>
  );
}

export default InputField;
