import React, { useState } from 'react';
const QuatitySelector = ( { max } ) => {
    const [quantity, setQuantity] = useState( 0 );

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity( newQuantity );
        // onQuantityChange( newQuantity );
    };

    const handleDecrease = () => {
        if ( quantity > 0 ) {
            const newQuantity = quantity - 1;
            setQuantity( newQuantity );
            // onQuantityChange( newQuantity );
        }
    };

    return (
        <>


        </>

    );
}

export default QuatitySelector