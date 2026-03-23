import {menuArray} from "./data.js"

const menuEl = document.getElementById("menu-items")
const yourOrder = document.getElementById("your-order")
const orderItems = document.getElementById("order-items")
const totalPriceEl = document.getElementById("total-price-number")
const modal = document.getElementById("modal-overlay")
const paymentForm = document.getElementById("payment-form")
const thankYouBox =document.getElementById("order-on-its-way")
const thankYou = document.getElementById("thank-you")
renderMenu()
let orders = []
let userInfo

document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        orders.push(menuArray.filter(function(order){
            return order.name === e.target.dataset.add
        })[0])
        thankYouBox.style.display = "none"
        renderOrder()
    } else if (e.target.dataset.remove){
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].name === e.target.dataset.remove) {
                orders.splice(i, 1)
                break
            }
        }
        console.log(orders.length)
        renderOrder()
    } else if (e.target.id === "complete-order") {
        modal.style.display = "block"
    } else if (e.target.id === "exit-btn") {
        modal.style.display = "none"
    } else if (e.target.id === "pay-btn") {
        e.preventDefault()
        userInfo = new FormData(paymentForm)
        yourOrder.style.display = "none"
        thankYouBox.style.display = "flex"
        thankYou.textContent = `Thanks, ${userInfo.get("fullName")}! Your order is on its way!`
    }
})

function renderMenu() {
    let menuHtml = ``
    for (let item of menuArray){
        menuHtml += `
        <div class="items">
            <div class="emoji">
            ${item.emoji}
            </div>
            <div class="description">
                <p class="item-name"> ${item.name} </p>
                <p class="item-ingredients"> ${item.ingredients} </p>
                <p class="item-price"> $${item.price} <p>
            </div>
            <button class="add-btn" data-add=${item.name}><i class="fa-solid fa-plus" data-add=${item.name}></i></button>
        </div>
        `
    }
    menuEl.innerHTML = menuHtml
}

function renderOrder(){
    let orderHtml = ``
    let totalPrice = 0
    if (orders.length === 0) {
        yourOrder.style.display = "none"
    } 
    else {
        yourOrder.style.display = "block"
        const orderFreq = new Map()
        for (let order of orders) {
            if (!orderFreq.has(order)){
                orderFreq.set(order, 1)
            } else{
                orderFreq.set(order, orderFreq.get(order) + 1)
            }
        }
        for (const [order, freq] of orderFreq){
            orderHtml += `
            <div class="total-price">
                <div id="food-and-button">
                    <p class="total"> ${order.name} x ${freq}</p>
                    <button id="remove-btn" data-remove=${order.name}> remove </button>
                </div>
                <p class="price-number"> $${order.price * freq}</p>
            </div>
            `
            totalPrice += order.price * freq 
        }
        orderItems.innerHTML = orderHtml
        totalPriceEl.innerHTML = `$${totalPrice}`
    }
}