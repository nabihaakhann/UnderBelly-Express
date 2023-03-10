import { Divider } from "../../ui/ui"

export default function CartFooter({items, onPlacingOrder}){
    const subtotal = function(){
        let sum = 0;
        items.forEach(item => {
            sum += item.quantity * item.price;
        })

        return sum;
    }();
    const tax = Math.ceil(0.18 * subtotal), totalAmount = tax + subtotal;

    const address = JSON.parse(localStorage.getItem('userInfo'))
        .addresses.filter(address => address.default === true)[0].address;

    console.log(address);

    return (
        <div id='cart-footer' >
            <div id="cart-address">
                    <h3>Delivering To : </h3>
                    <p>
                        {address}
                    </p>
            </div>
            <div id="cart-total">
                <div className="row-alignment" style={{margin: '1.5rem 0', paddingLeft: '1.2rem'}}>
                    <p>Cart SubTotal </p>
                    <p>Rs. {subtotal}</p>
                    
                </div>
                <div  className="row-alignment" style={{margin: '1.5rem 0', paddingLeft: '1.2rem'}}>
                    <p>Tax @ 18% GST</p>
                    <p>Rs. {tax}</p>
                </div>
                
                <Divider height="1px" color="#FFC978"/>

                <div  className="row-alignment" style={{margin: '1.5rem 0', paddingLeft: '1.2rem'}}>
                    <p><strong>Total Amount</strong></p>
                    <p>Rs. {totalAmount}</p>
                </div>
                
                <div>
                    <button id="place-order-button" onClick={()=> onPlacingOrder(totalAmount, address)}>Place an Order!</button>    
                </div>
            </div>
        </div>
    )
}