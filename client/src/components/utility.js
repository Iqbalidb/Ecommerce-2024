import toast from "react-hot-toast";

export const handleAddToCart = ( cart, setCart, product ) => {
    const existingProduct = cart.find( ( item ) => item._id === product._id );

    let updatedCart;

    if ( existingProduct ) {
        // Increase the quantity of the existing product
        updatedCart = cart.map( ( item ) =>
            item.id === product.id
                ? {
                    ...item,
                    cartQuantity: item.cartQuantity + 1,
                    subTotalPrice: ( item.cartQuantity + 1 ) * item.price
                }
                : item
        );
    } else {
        // Add new product with quantity set to 1 if not found
        updatedCart = [...cart, {
            ...product,
            cartQuantity: 1,
            subTotalPrice: product.price
        }];

    }

    setCart( updatedCart );

    // Store the updated cart in localStorage
    localStorage.setItem( "cart", JSON.stringify( updatedCart ) );

    // Display a success message
    toast.success( 'Item added successfully' );
};