let Calculator = function(values){
  //Delete Elements
  function delElement(index){
    values.mainContainer.innerHTML="";
    values.dbElements.splice(index, 1);
    displayValues();
  }

  //Create new element
  function newElement(value){
    values.mainContainer.innerHTML="";
    values.dbElements.push(value);
    displayValues();
  }

  //count elements
  function countElements(){
    if(values.countElements){
        values.countElements.innerHTML = values.dbElements.length;
    }
  }
  function countProductsPrice(){
    let price = 0
    for(let value of values.dbElements){
      price += parseFloat(value.price);
    }

    if(values.countProductPrice){
        values.countProductPrice.innerHTML = price;
    }

  }
  //Display values
  function displayValues(){
    let ol = null;
    if(values.dbElements == null){
        values.dbElements=[];
    }
    if(values.dbElements.length<1){
      values.mainContainer.innerHTML = "Brak elementów do wyświetlenia";
    }

    if(ol == null){
      ol = document.createElement('ol');
      values.mainContainer.appendChild(ol);
    } else {
      values.mainContainer.innerHTML="";
    }
    values.dbElements.forEach(function(element, index){
      let ul = document.createElement('ul'),
          productLi = document.createElement('li'),
          productText = document.createTextNode(element.product),
          priceLi = document.createElement('li'),
          priceText = document.createTextNode(element.price),
          delSingleElement = document.createElement('li');
          delSingleElement.innerHTML="[del]";
        productLi.appendChild(productText);
        priceLi.appendChild(priceText);
        ul.appendChild(productLi);
        ul.appendChild(priceLi);
        ul.appendChild(delSingleElement);
        ol.appendChild(ul);

        delSingleElement.setAttribute('id', 'del-' + index); // for F
        document.querySelector('#del-' + index).addEventListener('click', function(){
          delElement(index);
        }, false);

      });

  countElements();
  countProductsPrice();

  }
  (function(){
    displayValues();
  })();

  return{
    newElement    : newElement,
    countElements : countElements
  }
}


var mainContainer = document.querySelector('.container');
var myArray={
  mainContainer: document.querySelector('.container'),
  countElements: document.querySelector('.count'),
  countProductPrice: document.querySelector('.productsPrice'),
  dbElements: [{
    product: 'Chipsy',
    price: 3
  },
  {
    product: 'Cola',
    price: 3.25
  }
]
}
var o = new Calculator(myArray);

let callbackArray = function(){
  let x = {product: document.getElementById("product").value,
           price: document.getElementById("price").value,};
  o.newElement(x);
  document.getElementById("product").value ="";
  document.getElementById("price").value ="";
}

//Check price
let checkPrice = function(value){
    flag = true;
  let reg = /^\d{1,4}(\.\d{0,2})?$/;
    
  if(!reg.test(value)) {
      flag = false
  } 
    
    if(value < 0.2){
      flag = false;
    }
    return flag;
}

let checkName = function(value){
  var reg = /^[A-Za-ząśćźżłó\s]{2,}$/;
  return reg.test(value);
}
//Clear errors
let clearErrors = function(){
  document.querySelector('.price_error').innerHTML = "";
  document.querySelector('.product_error').innerHTML = "";
}
document.querySelector('button').addEventListener('click', function(){
  clearErrors();
  let check_price = checkPrice(document.querySelector('#price').value),
      check_product = checkName(document.querySelector('#product').value);
  if(!check_price){
    document.querySelector('.price_error').innerHTML="Błąd. Niewidłowa cena";
  }
  if(!check_product){
    document.querySelector('.product_error').innerHTML="Błąd. Niewidłowe nazwa produktu";
  }
  if(check_price && check_product){
    callbackArray();
  }
});
