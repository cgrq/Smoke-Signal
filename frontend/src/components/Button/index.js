

function Button({ name, disabled, isFormElement = false }) {
    return (
        <button
            type={"submit"}
            disabled={disabled}
        >
            {name}
        </button>
    )
}

export default Button;
