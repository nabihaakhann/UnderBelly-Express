
export default function CartItem(){
    return(
        <div className="product-item">
            <div style={{display: 'flex', justifyContent: 'space-evenly '}}>
                <img src={require('../../assets/images/Main-Course.jpg')} style={{height: '8rem', width: '8rem', borderRadius: '4px'}} />
                <p>Honey Chilli Potato</p>
            </div>
            <div>
                <p>Rs. 70</p>
            </div>
            <div>
                <p style={{border: '1px rgb(227, 225, 225) solid', borderRadius: '15px' ,display: 'inline-block', padding: '0.25rem 1rem'}}>
                    <span style={{marginRight: '1rem'}}><i class="fa-solid fa-minus"></i></span>
                    2
                    <span style={{marginLeft: '1rem'}}><i class="fa-solid fa-plus"></i></span>
                </p>
            </div>
            <div>
                <p><strong>Rs. 140</strong></p>
            </div>
            <div>
                <i class="fa-solid fa-xmark" style={{fontSize: '1.5rem'}}></i>
            </div>
        </div>
    )
}