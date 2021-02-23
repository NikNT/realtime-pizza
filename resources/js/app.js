import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    //Send Request to Server

    axios.post('/update-cart', pizza).then(res =>{

        cartCounter.innerText = res.data.totalQty

        new Noty ({

            type: 'success', 
            
            timeout: 2000, 

            text: 'Item Added to Cart'

        }).show(); 

    }).catch(err => {

        new Noty ({

            type: 'error', 
            
            timeout: 2000, 

            text: 'Oops! Something Went Wrong! '

        }).show(); 





    })

}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) =>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)


    })
})