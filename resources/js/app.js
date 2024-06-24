const axios = require("axios");
const Noty = require("noty");
import { initAdmin } from './admin';  // Adjust the path accordingly
import moment from 'moment';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
    axios.post('/update-cart',pizza).then(res=>{
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

//Remove alert message afte X seconds

const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() => {
        alertMsg.remove()
    }, 2000);
}

initAdmin()

// Change order status
let statuses = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value : null

order = JSON.parse(order)

let time = document.createElement('small')


function updateStatus(order) {
    let statusCompleted=true
    statuses.forEach(status => {
        let dataProp = status.dataset.status;
        if (statusCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp == order.status) {
            statusCompleted=false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
            
        }
    });
}

updateStatus(order);