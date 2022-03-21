// owl carousel script
$(document).ready(function(){
$('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
        0:{
            items: 1,
            nav: false
        },
        600:{
            items: 2,
            nav: false
        },
        1000:{
            items: 3,
            nav: false
        }
    }
});
});





  
//BUsiness Logic.
function Pizza(size,crust,topping){
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.total = (parseInt(this.size) + parseInt(this.crust) + parseInt(this.topping) )
}
function PizzaOrder(){
    this.pizza = [];
}

function resetFields() {
    var inputtedSizePrice = $("#pizzaSize").val("");
    var inputtedCrustPrice = $("#pizzacrust").val("");
    var inputtedToppingPrice = $("#pizzaToppings").val("");
}

function genRandId(){
    var rand = Math.floor(Math.random() * 10)
    return `#PIZZERIA${rand}-J`
}
function genOderId(){
    var rand = Math.floor(Math.random() * 10)
    return `#PIZZERIA${rand}-J`
}
var reset = function(){
    location.reload();
} 

Pizza.prototype.getSize = function(size){
    if(size==="600"){
        return `Small - ${this.size}`
    }else if(size==="900"){
        return `Medium - ${this.size}`
    }else if(size==="1200"){
        return `Large - ${this.size}`
    }  else if(size==="1600"){
        return `Extra-Large - ${this.size}`
    }   
}

Pizza.prototype.getCrust = function(crust){
    if(crust==="100"){
        return `Wheat-thin crust - ${this.crust}`
    }else if(crust==="200"){
        return `Gluten-free crust - ${this.crust}`
    }else if(crust==="300"){
        return `Cheese Crust - ${this.crust}`
    } 
}

Pizza.prototype.getToppings = function(topping){
    if(topping==="300"){
        return `Pepperoni - ${this.topping}`
    }else if(topping==="400"){
        return `Sausages - ${this.topping}`
    }else if(topping==="200"){
        return `Pineapple - ${this.topping}`
    } else if(topping==="500"){
        return `Mushroom - ${this.topping}`
    } else if(topping==="150"){
        return `Vegetables - ${this.topping}`
    } 
}

Pizza.prototype.getTotal = function(){
    return this.total
}



var deliveryOrder = new PizzaOrder()
var sum =0;

function getGrandTotal(){
    for(let i =0; i < deliveryOrder.pizza.length; i++){
        sum += deliveryOrder.pizza[i].total
    }
    return sum;
} 


//User Interface Logic

$(document).ready(function(){
    $("#toHide").hide();
    $("#alsoToHide").hide();
    $("#stayLocation").hide()
    $("#message").hide()
    $("form#form").submit(function(event) {
        event.preventDefault();
        var inputtedSizePrice = $("#pizzaSize").val();
        var inputtedCrustPrice = $("#pizzaCrust").val();
        var inputtedToppingPrice = $("#pizzaTopping").val();
        if(inputtedSizePrice ==="" || inputtedCrustPrice ==="" || inputtedToppingPrice ===""){
            reset()
            alert("Please make a pick from the available options")
        }else{
            var pickedPizza = new Pizza(inputtedSizePrice,inputtedCrustPrice,inputtedToppingPrice)
            var placedOrder = new PizzaOrder()
            placedOrder.pizza.push(pickedPizza)
            deliveryOrder.pizza.push(pickedPizza)
            resetFields();
        }
      
        $("#toHide").show();
        placedOrder.pizza.forEach(function(pickedPizza){
        $("#PizzaDisplay").append(`<tr>
                <th scope="row">${genRandId()}</th>
                <td>${pickedPizza.getSize(pickedPizza.size)}</td>
                <td>${pickedPizza.getCrust(pickedPizza.crust)}</td>
                <td>${pickedPizza.getToppings(pickedPizza.topping)}</td>
                <td>${pickedPizza.getTotal()}</td>
          </tr>`);
        }) 
    });

    $( "#target" ).click(function() {
        $("#alsoToHide").show()
        $("#message").hide()
        $("#target").hide()
        $("#stayLocation").hide()
        $("#track").append(`<strong>${genOderId()}</strong>`)
        $("#total").append(`<strong>${getGrandTotal()}</strong>`)
      });
    
      $("#delivery").click(function(){
        $("#stayLocation").show()
        $("#wouldYou").hide()    
    });

    $("#withLoc").click(function(){
        var location = $("#stay").val()  
        if(location===""){
            alert("Enter delivery location")
        }else{
            $("#withLoc").hide()
            $("#stay-text").hide()
            $("#stay").hide()
            $("#delly").append(`Total amount, inclusive of delivery fee is <strong>${sum + 200}</strong> 
                Your order will be delivered to 
                <strong>${location}</strong>`)
        }
           
    })



    $("#nodeli").click(function(){
        $("#wouldYou").hide()
    });

    $("#confirm").click(function(){       
        $("#final").hide()
        $("#stayLocation").hide()
        $("#message").show()
    })


})
