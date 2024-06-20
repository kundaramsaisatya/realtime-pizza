const axios = require("axios");
const Noty = require("noty");
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    axios.post('/updata-cart',pizza).then(res=>{
        cartCounter.innerHTML = res.data.totalQty;
        new Noty({
            // type:'success',
            timeout: 1000,
            // progressBar:false,
            text: "Added to cart successfully"
          }).show();
    }).catch(err=>{
        new Noty({
            type:'error',
            timeout: 1000,
            text: "Something went wrong",
            theme: 'mint error'
          }).show();
    })
    
}

addToCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza)
    })
});