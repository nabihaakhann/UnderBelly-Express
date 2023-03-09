
export default function CartItem({itemData, deleteCartItem, handleQuantityChange}){
    return(
        <div className="product-item">
            <div style={{display: 'flex', justifyContent: 'space-evenly '}}>
                <img src={`data:${itemData.imageType};base64,${itemData.itemImage}`} style={{height: '8rem', width: '8rem', borderRadius: '4px'}} />
                <p style={{width: '10rem'}}>{itemData.name}</p>
            </div>
            <div>
                <p>{itemData.price}</p>
            </div>
            <div>
                <p style={{border: '1px rgb(227, 225, 225) solid', borderRadius: '15px' ,display: 'inline-block', padding: '0.25rem 1rem'}}>
                    <span style={{marginRight: '1rem'}}><i class="fa-solid fa-minus" onClick={()=> handleQuantityChange(itemData._id, 'subtract')}></i></span>
                    {itemData.quantity}
                    <span style={{marginLeft: '1rem'}}><i class="fa-solid fa-plus" onClick={()=> handleQuantityChange(itemData._id, 'add')}></i></span>
                </p>
            </div>
            <div>
                <p><strong>{itemData.price * itemData.quantity}</strong></p>
            </div>
            <div>
                <i class="fa-solid fa-xmark" style={{fontSize: '1.5rem'}} onClick={()=> deleteCartItem(itemData._id)}></i>
            </div>
        </div>
    )
}