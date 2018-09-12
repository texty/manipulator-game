//розташування карток одна під одною

var cardbox = $('.card')[0].getBoundingClientRect();
var width = cardbox.width,
    height = cardbox.height;
var media;

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

window.addEventListener("resize", function() {
    cardbox = $('.card')[0].getBoundingClientRect();
    width = cardbox.width,
    height = cardbox.height;
    setSize()

});


var sliderFunction = function(elem) {
    var currentList = $(elem).parent();
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
    $(this).parent().find("p.additionalInfo").css("display", "block");
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

$(".next").on("click", function(){
    var containerForRemove = $(this)
        .parent()
        .parent()
        .parent()
        .parent();
    containerForRemove.remove();

    if($(this).parents(".last").length){
        $(".card.block2").css("display","block"); //TODO переробити так, аби выдкривався наступний блок
    }

});


//кнопки Так чи Ні

$(".answer").on("click", function() {
    var answerPoints = $(this).attr("value");
    $(this).parent().attr("value", answerPoints);
    var current = $("#currentPoints").html();
    var plus = answerPoints;
    current = +current;
    plus = +plus;
    
    spiralDraw(plus, current);
   

    $(this).parent().find(".next").removeClass("hide").addClass("show");

});




$(".arrowRight").on("click", function() {
    var elem = this;
    sliderFunction(elem);

});

$("button.answer").on("click", function() {
    var elem = this;
    // sliderFunction(elem);
    $(elem).parent().find(".nextSlide").removeClass("hide").addClass("show");
    $(this).parent().find("p.mainInfo").css("display", "none");

    if($(this).hasClass("answerYes")){
        $(this).parent().find("p.additionalInfoYes").css("display", "block");
    }

    if($(this).hasClass("answerNo")){
        $(this).parent().find("p.additionalInfoNo").css("display", "block");
    }
    $(elem).parent().find(".answer").remove();

});


$(".nextSlide").on("click", function() {
    var elem = this;
    sliderFunction(elem);

});



