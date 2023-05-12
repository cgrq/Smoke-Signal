import './ErrorHandler.css';

function ErrorHandler({ errors }) {
    return (
        <div className='error-div'>
            {Object.values(errors).map(error => (
                <p key={error} className='error-p'>
                    {error}
                </p>
            ))}
        </div>
    )
}

export default ErrorHandler;
