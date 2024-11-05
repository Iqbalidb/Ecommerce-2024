import React from 'react'

const DividerWithText = ( { text } ) => {
    return (
        <div className="divider-container">
            <div className="line"></div>
            <span className="divider-text">{text}</span>
            <div className="line"></div>
        </div>
    )
}

export default DividerWithText