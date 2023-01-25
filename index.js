import { menuArray }  from "./data.js"
const menuContainer=document.getElementById('menu-items-container')
const shoppingCard=document.getElementById("your-orders")
const cardModal=document.getElementById('card-details')
const formElement=document.getElementById('form-element')
let shoppingArray=[]
let yourOrderHtml=''

//Event listeners
document.addEventListener('click',(e)=>{
  if(e.target.dataset.order){
    addOrder(e.target.dataset.order)
  }else if(e.target.dataset.remove){
    removeOrder(e.target.dataset.remove)
  }else if(e.target.id=='complete'){
    completeOrder()
  }else if(e.target.id=='close-card-details'){
    closePaymentDetails()
  }else if(e.target.id =='rate'){
    rate()
  }else if(e.target.id=='star1'){
    document.getElementById('star1').classList.add('checked')
  }else if(e.target.id=='star2'){
    document.getElementById('star1').classList.add('checked')
    document.getElementById('star2').classList.add('checked')
  }else if(e.target.id=='star3'){
    document.getElementById('star1').classList.add('checked')
    document.getElementById('star2').classList.add('checked')
    document.getElementById('star3').classList.add('checked')
  }else if(e.target.id=='star4'){
    document.getElementById('star1').classList.add('checked')
    document.getElementById('star2').classList.add('checked')
    document.getElementById('star3').classList.add('checked')
    document.getElementById('star4').classList.add('checked')
  }else if(e.target.id=='star5'){
    document.getElementById('star1').classList.add('checked')
    document.getElementById('star2').classList.add('checked')
    document.getElementById('star3').classList.add('checked')
    document.getElementById('star4').classList.add('checked')
    document.getElementById('star5').classList.add('checked')
  }else if(e.target.id =='rate-btn'){
    document.getElementById('navEl').innerHTML=
    `<p class='afterRate'>Thank you for your rating.You can go back home and buy more from us</p>
      <button class='home'><a href='index.html'>Go buy more<a/></button>
    `
  }
})

//Payment section element event listener
formElement.addEventListener('submit',(e)=>{
  e.preventDefault()
  closePaymentDetails()

  const finishPage=document.getElementById('thank-you')
  finishPage.innerHTML=`
  <div>
  <p>Thank you for your purchase.Please can you rate your purchase experience  from 0 to 5 stars</p>
    <div class="stars" >
      <i class="fa-solid fa-star" id='star1'></i>
      <i class="fa-solid fa-star" id='star2'></i>
      <i class="fa-solid fa-star" id='star3'></i>
      <i class="fa-solid fa-star" id='star4'></i>
      <i class="fa-solid fa-star" id='star5'></i>
    </div>
    <button class='rate' id='rate-btn'>Rate</button>
</div>
</div>`
  finishPage.style.display='flex'
})

//Event listeners action functions

function addOrder(orderId){
  shoppingArray.push(menuArray.filter(item => item.id == orderId)[0])
render()
}

function removeOrder(removeId){
  const index =shoppingArray.findIndex((item)=>item.id == removeId)
  shoppingArray.splice(index,1)
  render()
}


//Completing Order
function completeOrder(){
  let sum=0
  shoppingArray.forEach((item)=>{
    sum+=item.price
  })
  document.getElementById('navEl').classList.add('completeClicked')
  document.getElementById('complete').classList.add('inactive')
  document.getElementById('message-to-costumer').innerText=`You will be  paying $${sum}  in total`
  cardModal.style.display='block'
  
}


//Closing Payment Form
function closePaymentDetails(){
  document.getElementById('complete').classList.remove('inactive')
  
  document.getElementById('navEl').classList.remove('completeClicked')
  cardModal.style.display='none'
}


function rate(){
  
  document.getElementById('thank-you').style.display='none'
  getMenus()
}

//Display ordering elements
function yourOrder(){
  let orderedItemsHtml=``
  let yourOrderHtml =''
  shoppingArray.forEach((item)=>{
    orderedItemsHtml +=`<div class='bought-items'>
                      <div class='item-name'>${item.name}
                      <button class='remove' data-remove=${item.id}>remove</button></div>
                      <div class='item-price'>$${item.price}</div>
    </div>
    `
  })
  if(shoppingArray.length>0){
  yourOrderHtml +=`<h1 class='card-header'>Your order</h1>
  <div>${orderedItemsHtml}</div>
`
}
return yourOrderHtml
}




//Displaying total sum and complete
function getTotalComplete(){
  let footer=''
  let sum=0
  shoppingArray.forEach((item)=>{
    sum+=item.price
  })
  if(sum){
  footer=`<div class='total-price'>
              <div>Total price:</div>
              <div class='sum'>$${sum}</div> 
  </div>
  <button class='complete' id='complete'>Complete Order</button>`
}
return footer
}






//Getting all menus
function getMenus(){
  let menuItems=''
  menuArray.forEach((items)=>{
    menuItems += `
      <div class='menu-items'>
          <div class='item-icon'>${items.emoji}</div>
          <div>
          <h4 class='item-name'>${items.name}</h4>
          <p class='ingredients'>${items.ingredients}</p>
          <h6 class='price'>$${items.price}</h6>
          </div>
          <button class='add-order' data-order='${items.id}'>+</button>
          </div>
      </div>
    `
  }
  )
  return menuItems
}
//rendering all
function render(){
  menuContainer.innerHTML = getMenus()
  shoppingCard.innerHTML =yourOrder()+getTotalComplete()
}
render();