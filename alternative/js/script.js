//розташування карток одна під одною

var cardbox = $('.card')[0].getBoundingClientRect();
var width = cardbox.width,
    height = cardbox.height;
var media;

//визначаємо кількість карток в блоці, щоб розтавити один на одного
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

var cards1 = $(".card.block1");
setSize(cards1);
var cards2 = $(".card.block2");
setSize(cards2);
var cards3 = $(".card.block3");
setSize(cards3);

window.addEventListener("resize", function() {
    cardbox = $('.card')[0].getBoundingClientRect();
    width = cardbox.width,
    height = cardbox.height;
    setSize()

});

//визначаємо кількість варіантів у слайді
var sliderFunction = function(elem) {
    var currentList = $(elem).closest(".variant");
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
    $(".card").not(card).find(".side").removeClass("show").addClass("hide");
    card.css("transform", "rotateY(180deg)");
    $(this).parent().find("p.additionalInfo").css("display", "block");
    $(this).parent().find("p.mainInfo").css("display", "none");
    var points = $(this).parent().attr("value");
    media = $(this).parent().find("p").find("b.media").html();
    $('h3 b#myMedia').html(media);
    $(this).removeClass("show").addClass("hide");
    $(this).parent().find(".noThanks").removeClass("show").addClass("hide");
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
        $(".card").find(".side").removeClass("hide").addClass("show");
        var containerForRemove = $(this).closest(".card");
        containerForRemove.remove();//видаляємо картку, яка вже непотрібна.remove();

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
        sectionIndex = currentIndex + 1;
        $(sections[sectionIndex]).find(".card").css("display","block");

        var headings = $(".head");
        $(".head").removeClass("whiteColor");
        $(headings[sectionIndex-1]).addClass("greyColor");
        $(headings[sectionIndex]).removeClass('greyColor').addClass("whiteColor");
        // $(".card.block2").css("display","block"); 
    }

});


//кнопки Так чи Ні

$(".answer").on("click", function() {
    var card = $(this).closest(".card");
    $(".card").not(card).find(".side").removeClass("show").addClass("hide");
    card.css("transform", "rotateY(180deg)");
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
    // $(this).parent().find("p.mainInfo").css("display", "none");
    var backInfo;
    if($(this).hasClass("answerYes")){
        backInfo = $(this).parent().find("p.additionalInfoYes").html();
    }

    if($(this).hasClass("answerNo")){
        backInfo = $(this).parent().find("p.additionalInfoNo").html();
    }

    $(this).closest(".variant").find(".side.back > p").html(backInfo);
    $(elem).parent().find(".answer").remove();

});


$(".nextSlide").on("click", function() {
    var card = $(this).parent().closest(".card");
    card.css("transform", "rotateY(0deg)");
    var elem = this;
    setTimeout(function(){
        sliderFunction(elem);
    }, 500);




});


$('.choice').on("click", function(){
    var card = $(this).closest(".card");
    card.css("transform", "rotateY(180deg)");
});

// $('.side.back').on("click", function(){
//     var card = $(this).closest(".card");
//     card.css("transform", "rotateY(90deg)");
// });


