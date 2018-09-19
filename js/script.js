
//розташування карток одна під одною
var cardbox = $('.card')[0].getBoundingClientRect();
var width = cardbox.width,
    height = cardbox.height;
var media;

//додаємо текст в месенджер
var newMessage = function(text) {
    var messenger = document.getElementById("messenger");
    var isScrolledToBottom = messenger.scrollHeight - messenger.clientHeight <= messenger.scrollTop + 1;
    var newElement = document.createElement("p");
    newElement.innerHTML = text;
    messenger.appendChild(newElement);
    if(isScrolledToBottom)
        messenger.scrollTop = messenger.scrollHeight - messenger.clientHeight;
};


var setSize = function(blockNumber) {
    for (var i = 0; i <= blockNumber.length + 1; i++) {
        var position = i * 20;
        var containerBox = $('#cards')[0].getBoundingClientRect();


        $(blockNumber[i])
            .css("margin-left", function () {
                var w = (containerBox.width - width - position) / 2;
                return w + position + "px";
            })
            .css("margin-top", function () {
                var h = ((window.innerHeight * 0.9) - height - position) / 2;
                return h + position + "px";
            })

            // .css("z-index", position)
            .css("order", i)

    }
};


var setSizeMob = function() {
    $(".card").css("width", "85vw").css("margin-left", "10vw").css("height", "50vh");
    $("#blockList").css("display", "none")
};
var cards1 = $(".card.block1");
var cards2 = $(".card.block2");
var cards3 = $(".card.block3");
var cards4 = $(".card.block4");
var cards5 = $(".card.block5");
var cards6 = $(".card.block6");


if (window.innerWidth >= 800) {
    setSize(cards1);
    setSize(cards2);
    setSize(cards3);
    setSize(cards4);
    setSize(cards5);
    setSize(cards6);
}

if (window.innerWidth < 800) {
    setSizeMob()

}

window.addEventListener("resize", function() {
    cardbox = $('.card')[0].getBoundingClientRect();
    width = cardbox.width,
    height = cardbox.height;
    setSize()

});


var sliderFunction = function(elem) {
    var currentList = $(elem).closest(".parentForSlider");
    var classString = currentList.attr('class'); // "blog button main"
    var theClass = classString.split(' ')[0];
    var listArray = document.getElementsByClassName(theClass);
    var index = $(listArray).index(currentList);
    index = index + 1;
    $(listArray).addClass("hide");

    if (index < listArray.length) {
        $(listArray[index]).removeClass("hide").addClass("show");
        $(listArray[index - 1]).removeClass("show").addClass("hide");
    }
    if (index >= listArray.length) {
        $(listArray).removeClass("show").addClass("hide");
        $(listArray[0]).removeClass("hide").addClass("show");
    }
};


//кнопка далі і додавання балів
$('.choice').on("click", function(){
    var card = $(this).closest(".card");
    // card.css("transform", "rotateY(180deg)");
    var messengerInfo = $(this).parent().find(".additionalInfo").html();
    var oldMessages = $("#messenger p").css("color", "grey");
    newMessage(messengerInfo);
    $(this).parent().find("p.mainInfo").css("display", "none");
    var points = $(this).parent().attr("value");
    media = $(this).parent().find("p").find("b.media").html();
    $('h3 b#myMedia').html(media);
    $(this).removeClass("show").addClass("hide");
    $(this).parent().find(".next").removeClass("hide").addClass("show");
    $(this).parent().find(".arrowRight").remove();

    //перемалювуэмо спіраль
    var current = $("#currentPoints").html();
    var plus = $(this).parent().attr("value");
    current = +current;
    plus = +plus;
    spiralDraw(plus, current);
    

});


//Перехід між блоками
$(".next").on("click", function(){

    var containerForRemove = $(this)
        .parent()
        .parent()
        .parent()
        .parent();
    containerForRemove.css("display", "none");//видаляємо картку, яка вже непотрібна



    if($(this).parents(".last").length){
        var currentDiv = $(this).closest(".card"); //знаходимо найближчу картку
        var sections = $('.section');
        var currentIndex;

        //костиль
        if(currentDiv.hasClass('block1') === true){
            currentIndex = 0
        }
        if(currentDiv.hasClass('block2') === true){
            currentIndex = 1
        }
        if(currentDiv.hasClass('block3') === true){
            currentIndex = 2
        }
        if(currentDiv.hasClass("block4") === true){
            currentIndex = 3
        }
        if(currentDiv.hasClass('block5') === true){
            currentIndex = 4
        }
        sectionIndex = currentIndex + 1;
        $(sections[sectionIndex]).find(".card").not(".hiddenCard").css("display","block");
            buttonPosition(cards2);
            buttonPosition(cards3);
            buttonPosition(cards4);
            buttonPosition(cards5);
            buttonPosition(cards6);



        var headings = $(".head");
        $(".head").removeClass("whiteColor");
        $(headings[sectionIndex-1]).addClass("greyColor");
        $(headings[sectionIndex]).removeClass('greyColor').addClass("whiteColor");
        // $(".card.block2").css("display","block");
    }

});


$(".nextQuestion").on("click", function() {
    var containerForRemove = $(this).closest(".card");
    containerForRemove.remove();//видаляємо картку, яка вже непотрібна

});


//кнопки Так чи Ні

$(".answer").on("click", function() {
    // var card = $(this).closest(".card");
    // card.css("transform", "rotateY(180deg)");
    var answerPoints = $(this).attr("value");
    $(this).parent().attr("value", answerPoints);
    var current = $("#currentPoints").html();
    var plus = answerPoints;
    current = +current;
    plus = +plus;
    spiralDraw(plus, current);
    $(this).parent().find(".next").removeClass("hide").addClass("show");
});


$(".noThanks").on("click", function() {
    var elem = this;
    sliderFunction(elem);
});


$("button.answer").on("click", function() {
    var elem = this;
    // sliderFunction(elem);
    $(elem).parent().find(".nextSlide").removeClass("hide").addClass("show");
    $(this).parent().find("p.mainInfo").css("display", "none");
    var messengerInfo;
    if($(this).hasClass("answerYes")){
        messengerInfo = $(this).parent().find("p.additionalInfoYes").html();
        $("#messenger p").css("color", "grey");
        newMessage(messengerInfo);
    }

    if($(this).hasClass("answerNo")){
        messengerInfo = $(this).parent().find("p.additionalInfoNo").html();
        $("#messenger p").css("color", "grey");
        newMessage(messengerInfo);
    }

    sliderFunction(elem);
    $(elem).parent().find(".answer").remove();

});


$(".nextSlide").on("click", function() {
    var elem = this;
    sliderFunction(elem);

});

$(".error").on("click", function() {
    var messengerInfo = $(this).parent().find(".additionalInfo").html();
    var oldMessages = $("#messenger p").css("color", "grey");
    newMessage(messengerInfo);
});


$(".dependb4Q1").on("click", function() {
    var choiceDepend = $(this).closest("li").find("div#textForChoiceDepend").html();
    $("#b4Q3V1").find("#choiceDepend").html(choiceDepend);
    var choiceDependAdditional = $(this).closest("li").find("div#textForChoiceDependAdditional").html();
    $("#b4Q3V1").find("#choiceDependAdditional").html(choiceDependAdditional);
    var currentValue = $(this).closest("li").find("div#textForChoiceDepend").attr("value");
    $("#b4Q3V1").attr("value", currentValue);
});


$(".myHint").on("click", function() {
    newMessage("<b style='color:blue;'>Підказка: краще атакувати загальну структуру, організацію, уряд, і не привязуватися до конкретних імен, які можуть дати відповідь, а то й піти до суду</b>");
    var allHints = $("button.myHint").addClass("hide");
    $(this).closest(".card").find(".choice").removeClass("hide"); 
});


$(".step").on("click", function() {
    var cardClass = $(this).attr("value");
    var allHidden = $(".hiddenCard");
    var targetCard;
        for (var i = 0; i< allHidden.length; i++ ){
           if($(allHidden[i]).hasClass(cardClass)){
               targetCard = allHidden[i];

           }
        }

    $("#replacement").remove();
    $(targetCard).find("li").css("height", "200px");
    $(targetCard).addClass("last").css('display', "block")
});






//рахуємо максимально і мінімально можливу кільксть балів, а також інтервали для кожного результату

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var allClassList = $(".parentForSlider").map(function(){return $(this).attr("class").split(' ')[0];}).get();
allClassList = allClassList.filter(onlyUnique);
listOfMinValues = [];
listOfMaxValues = [];
for(var i = 0; i < allClassList.length;i++){
    var valueArray = $("."+allClassList[i]).map(function(){return $(this).attr("value");}).get();
    valueArray = valueArray.map(Number);
    var minValue = Math.min.apply(Math, valueArray);
    listOfMinValues.push(minValue);
    var maxValue = Math.max.apply(Math, valueArray);
    listOfMaxValues.push(maxValue);
}

var sumOfMin = listOfMinValues.reduce(function(a, b) { return a + b; }, 0);
var sumOfMax = listOfMaxValues.reduce(function(a, b) { return a + b; }, 0);

var resultInterval = (sumOfMax - sumOfMin) / 5;


var mainDezinformer  = sumOfMax - resultInterval;
// console.log(mainDezinformer);
var vandal  = sumOfMax - (resultInterval * 2);
// console.log(vandal);
var paidJournalist =  sumOfMin + (resultInterval * 3);
// console.log(paidJournalist);
var trashAggregator =  sumOfMin + (resultInterval * 2);
// console.log(trashAggregator);
var sissy = sumOfMin +  resultInterval;
// console.log(sissy);


//закриваємо модальне вікно
$("button#play").on("click", function() {
    $("#myModal").remove();
    buttonPosition(cards1);

});


//вираховуємо li.height для кожної картки
var buttonPosition = function(blockNumber) {
    for (var i = 0; i < blockNumber.length; i++) {
        var h3Title = $(blockNumber[i]).find("h3")[0].getBoundingClientRect();
        var h3Height = h3Title.height + 20;
        var containerHeight = $(blockNumber[i])[0].getBoundingClientRect();
        containerHeight = containerHeight.height;
        var liHeight = containerHeight - h3Height - 50 - 25;
        console.log(liHeight);
        var allListsInCard = $(blockNumber[i]).find("li");
        for(var n = 0; n < allListsInCard.length; n++){
            $(allListsInCard[n]).css("height", liHeight)
        }
    }
};

// buttonPosition(cards1);