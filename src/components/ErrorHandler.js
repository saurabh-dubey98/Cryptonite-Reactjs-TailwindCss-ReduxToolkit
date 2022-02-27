import React from 'react'

const ErrorHandler = ({ error }) => {
    return (
        <div className={`font-body font-bold p-3 my-5 text-lg rounded-lg shadow-md text-white bg-red-500`}>
            <p>An error occured</p>
            <pre>{(error?.data?.message && error?.data?.message) || error?.data?.error.message}</pre>
        </div>
    )
}

export default ErrorHandler;