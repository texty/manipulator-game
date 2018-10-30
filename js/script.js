//перекрашуємо картки в той самий колір через баг inherit
$(".card").css("border-color", "#6e9ae2");


//визначаємо змінні
var containerBox = $('#cards')[0].getBoundingClientRect();
var media;
var mediaImgSource;
var hex;
var cards1 = $(".card.block1");
var cards2 = $(".card.block2");
var cards3 = $(".card.block3");
var cards4 = $(".card.block4");
var cards5 = $(".card.block5");
var cards6 = $(".card.block6");




Array.prototype.remByVal = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

Array.prototype.remByValTwo = function(val1, val2) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val1 && this[i] === val2) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};


function showBlinkArrow(){

}


//малюємо квадрати в жовтому полі
var drawSquares = function () {
    var yellowBox = $("#rightSideBefore")[0].getBoundingClientRect();
    var sqaureW = yellowBox.width / 5;
    var sqaureRows = Math.floor(yellowBox.height / sqaureW);
    var sqaureH = yellowBox.height / sqaureRows;
    var divsInBox = sqaureRows * 10;
    for (var t = 0; t < divsInBox; t++) {
        $("#rightSideBefore")
            .append('<div id="r' + t + '" class="square"></div>')
    }
    var rects = $(".square");
    var colors = ['rgb(124, 31, 45)', 'rgb(255, 255, 0)', "rgb(28, 186, 248)", "rgb(0, 95, 146)", "rgb(255, 0, 0)", "rgb(255, 255, 255)", "rgb(128, 128, 128)"];


    for(var r = 0; r < rects.length; r++){
        var random_color = colors[Math.floor(Math.random() * colors.length)];

        if(r < 1){
            $(rects[r]).css("background-color", random_color);
        }
        if(r > 0 && r <= 4){
            var minus1 = $(rects[r - 1]).css("background-color");
            var colorsMinusOne = colors
                .filter(function(e) {
                    return e != minus1
                });
            var random1 = colorsMinusOne[Math.floor(Math.random() * colorsMinusOne.length)];
            $(rects[r]).css("background-color", random1);
        }
        if(r > 4) {
            var minus1 = $(rects[r - 1]).css("background-color");
            var minus5 = $(rects[r - 5]).css("background-color");
            var colorsMinusTwo = colors
                .filter(function(e) {
                    return e != minus1 && e != minus5 });
            var random2 = colorsMinusTwo[Math.floor(Math.random() * colorsMinusTwo.length)];
            $(rects[r]).css("background-color", random2);
        }
    }
        $(".square").css("width", sqaureW).css("height", sqaureH);

};



//додаємо текст в месенджер
var newMessage = function (text, result) {
    var messenger = document.getElementById("messenger");
    var isScrolledToBottom = messenger.scrollHeight - messenger.clientHeight - 300 <= messenger.scrollTop + 1;
    var newElement = document.createElement("p");
    newElement.innerHTML = text;
    $(newElement).addClass('blink');
    messenger.appendChild(newElement);

    if(result) {
        //додаємо кнопку "показати результати і результати"
        var myResultContainer = document.createElement("div");
        $(myResultContainer).attr("class", "contentButton contentButtonHide");
        messenger.appendChild(myResultContainer);
        var showResultButton = document.createElement("button");
        showResultButton.innerHTML = "показати обрану відповідь";
        myResultContainer.appendChild(showResultButton);
        $(showResultButton)
            .attr("class", "showChoiceResult")
            .css("color", function () {
                if (hex) {
                    return hex
                } else {
                    return "grey"
                }
            });

        //по кліку на кнопку показуємо їх, по повторному ховаємо
        $(showResultButton).on("click", function () {
            $(this).closest(".contentButton").toggleClass("contentButtonHide");
            var text = $(this).closest(".contentButton").find(".showChoiceResult").html();
            if (text === "показати обрану відповідь") {
                $(this).html("cховати обрану відповідь")
            } else {
                $(this).html("показати обрану відповідь")
            }
            messenger.scrollTop = messenger.scrollHeight - 50;
        });

        //додаємо обраний варіант
        var myResultText = document.createElement("p");
        $(myResultText).css("color", function () {
            if (hex) {
                return hex
            } else {
                return "grey"
            }
        });
        myResultText.innerHTML = result;
        myResultContainer.appendChild(myResultText);
        if (isScrolledToBottom)
            messenger.scrollTop = messenger.scrollHeight - messenger.clientHeight + 1;
    }
    else {
        if (isScrolledToBottom)
            messenger.scrollTop = messenger.scrollHeight - messenger.clientHeight + 1;
    }
    
}; //кінець функції додавання повідомлення



//розташування карток одна під одною
var setSize = function (blockNumber) {
    var openCards = $(".card");
    var width,
        height;
    if (window.innerWidth >= 2000){
        width = 700;
        height = 500;
        $(".card").css("width", "700px").css("height", "500px");//повертаємо дескотопний розмір, якщо до цього була мобілка
    }
            
    else {
        width = 500;
        height = 350;
        $(".card").css("width", "500px").css("height", "350px");//повертаємо дескотопний розмір, якщо до цього була мобілка
    }
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
                // var h = height/2;
                return h + position + "px";
            })
    }
    var deskCardHeight = $(openCards)[0].getBoundingClientRect();
    deskCardHeight = deskCardHeight.height;
    $(".cardContainer").css("height", deskCardHeight - 100);
};

//розташування для моб еканів
var setSizeMob = function () {
    var openCards = $(".card");
    var mobCardHeight;
    if(window.innerWidth === 768 && window.innerHeight === 1024){
        $(".card").css("width", "calc(80% - 60px)").css("margin-left", "calc(10% + 45px").css("height", "40vh").css("margin-top", "0");
        $("#messenger").css("width", "calc(80% - 30px)").css("margin-left", "calc(10% + 15px");
        mobCardHeight = $(openCards)[0].getBoundingClientRect();
        $("#logomob").css("margin-left", mobCardHeight.left-30);
        $("#spiralmob").css("margin-right", mobCardHeight.left - 30);
        mobCardHeight = mobCardHeight.height;
        $(".cardContainer").css("height", mobCardHeight - 80);

    }
    else {
        $(".card").css("width", "calc(100% - 60px)").css("margin-left", "45px").css("height", "50vh").css("margin-top", "0");
        mobCardHeight = $(openCards)[0].getBoundingClientRect();
        $("#logomob").css("margin-left", mobCardHeight.left-30);
        mobCardHeight =mobCardHeight.height;
        $(".cardContainer").css("height", mobCardHeight - 50);


    }
    $("#blockList").css("display", "none")
};


if (window.innerWidth >= 825) {
    setSize(cards1);
    setSize(cards2);
    setSize(cards3);
    setSize(cards4);
    setSize(cards5);
    setSize(cards6);
    drawSquares();
}


if (window.innerWidth < 825 ) {
    setSizeMob()

}

window.addEventListener("resize", function () {
    if (window.innerWidth >= 825) {
        setSize(cards1);
        setSize(cards2);
        setSize(cards3);
        setSize(cards4);
        setSize(cards5);
        setSize(cards6);
        drawSquares();
    }
    if(window.innerWidth < 825 && window.innerWidth < window.innerHeight){
        setSizeMob();
        $(".square").remove();
    }

    // drawSquares();

});

//функція, запускає слайдер варіантів відповіді
var sliderFunction = function (elem) {
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


//кнопка "Обрати" і додавання балів
$('.choice').on("click", function () {

    var card = $(this).closest(".card");
    // card.css("transform", "rotateY(180deg)");
    var messengerInfo = $(this).parent().find(".additionalInfo").html();
    var choicenResult = $(this).parent().find(".mainInfo").html();
    var oldMessages = $("#messenger p").not('.contentButton p').css("color", "grey");
    newMessage(messengerInfo, choicenResult);
    $(this).parent().find("p.mainInfo").css("display", "none");
    var points = $(this).parent().attr("value");
    $(this).removeClass("show").addClass("hide");
    $(this).parent().find(".next").removeClass("hide").addClass("show");
    $(this).parent().find(".arrowRight").remove();

    //перемалювуэмо спіраль
    var current = $("#currentPoints").html();
    var plus = $(this).parent().attr("value");
    current = +current;
    plus = +plus;
    spiralDraw(plus, current);
    var lastPoints = $("#lastPoints").html(currentTotalPoints);

});


//коли відповідаємо на питання "обрати медіа", переносить лого наверх і перекрашує
$(".selectMedia").on("click", function () {
    media = $(this).parent().find("img").attr("alt");
    $(this).parent().find("img").attr("id", "logoId");
    if(window.innerWidth > 825){
        func ("#mediaLogo");
    }
    if(window.innerWidth <= 825){
        func("#logomob");
    }
    mediaImgSource = $(this).parent().find("img").attr("src");
    $("#logomob").html("<img id='logoIdMob' src='"+mediaImgSource+"'/>");
    hex = $(this).parent().find("img").attr("name");
    swapStyleSheet();
    var style = document.createElement('style');
    style.type = 'text/css';
    var keyFrames = '\
@-webkit-keyframes blink-animation {\
    from {\
        color: white;\
    }\
    to {\
       color: red; \
    }\
}\
@-moz-keyframes blink-animation {\
   from {\
        color: white;\
    }\
    to {\
       color: red; \
    }\
}';


    style.innerHTML = keyFrames.replace(/red/g, hex);
    document.getElementsByTagName('head')[0].appendChild(style);
    $('h3 b#myMedia').html(media);
    $("#rightSideBefore").remove();
});


//Перехід між блоками
$(".next").on("click", function () {
    var containerForRemove = $(this)
        .parent()
        .parent()
        .parent()
        .parent();
    // containerForRemove.css("display", "none");//видаляємо картку, яка вже непотрібна
    containerForRemove.remove();

    if ($(this).parents(".last").length) {
        var currentDiv = $(this).closest(".card"); //знаходимо найближчу картку
        var sections = $('.section');
        var currentIndex;
        //костиль
        if (currentDiv.hasClass('block1') === true) {
            currentIndex = 0
        }
        if (currentDiv.hasClass('block2') === true) {
            currentIndex = 1
        }
        if (currentDiv.hasClass('block3') === true) {
            currentIndex = 2
        }
        if (currentDiv.hasClass("block4") === true) {
            currentIndex = 3
        }
        if (currentDiv.hasClass('block5') === true) {
            currentIndex = 4
        }
        sectionIndex = currentIndex + 1;
        $(sections[sectionIndex]).find(".card").not(".hiddenCard").css("display", "block");

        //розташування кнопок на одному рівні
        // buttonPosition(cards2);
        // buttonPosition(cards3);
        // buttonPosition(cards4);
        // buttonPosition(cards5);
        // buttonPosition(cards6);

        //переключаємо колір меню зверху
        var headings = $(".head");
        $(".head").removeClass("whiteColor");
        $(headings[sectionIndex - 1]).addClass("greyColor");
        $(headings[sectionIndex]).removeClass('greyColor').addClass("whiteColor");
        // $(".card.block2").css("display","block");
    }

});


$(".nextQuestion").on("click", function () {
    var containerForRemove = $(this).closest(".card");
    containerForRemove.remove();//видаляємо картку, яка вже непотрібна
});


//кнопки Так чи Ні
$(".answer").on("click", function () {
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


$(".noThanks").on("click", function () {
    var elem = this;
    sliderFunction(elem);
});


$("button.answer").on("click", function () {
    var elem = this;
    // sliderFunction(elem);
    $(elem).parent().find(".nextSlide").removeClass("hide").addClass("show");
    $(this).parent().find("p.mainInfo").css("display", "none");
    var messengerInfo;
    var choicenResult;
    if ($(this).hasClass("answerYes")) {
        messengerInfo = $(this).parent().find("p.additionalInfoYes").html();
        choicenResult = $(this).parent().find("p.mainInfo").html();
        choicenResult = choicenResult + " (ТАК)";
        $("#messenger p").not('.contentButton p').css("color", "grey");
        newMessage(messengerInfo, choicenResult);
    }

    if ($(this).hasClass("answerNo")) {
        messengerInfo = $(this).parent().find("p.additionalInfoNo").html();
        choicenResult = $(this).parent().find("p.mainInfo").html();
        choicenResult = choicenResult + " (HI)";
        $("#messenger p").not('.contentButton p').css("color", "grey");
        newMessage(messengerInfo, choicenResult);
    }

    sliderFunction(elem);
    $(elem).parent().find(".answer").remove();

});


//наступний слайд
$(".nextSlide").on("click", function () {
    var elem = this;
    sliderFunction(elem);

});

//коли треба, аби при натисканні вилізло повідовлення в чат, але можливість потім обирати залишилась
$(".error").on("click", function () {
    var messengerInfo = $(this).parent().find(".additionalInfo").html();
    var oldMessages = $("#messenger p").css("color", "grey");
    newMessage(messengerInfo);
});

//
$(".dependb4Q1").on("click", function () {
    var choiceDepend = $(this).closest("li").find("div#textForChoiceDepend").html();
    $("#b4Q3V1").find("#choiceDepend").html(choiceDepend);
    var choiceDependAdditional = $(this).closest("li").find("div#textForChoiceDependAdditional").html();
    $("#b4Q3V1").find("#choiceDependAdditional").html(choiceDependAdditional);
    var currentValue = $(this).closest("li").find("div#textForChoiceDepend").attr("value");
    $("#b4Q3V1").attr("value", currentValue);
});

//підказка в чат (костиль)
$(".myHint").on("click", function () {
    newMessage("<b style ='color:" + hex + "'>Підказка: краще атакувати загальну структуру, організацію, уряд, і не привязуватися до конкретних імен, які можуть дати відповідь, а то й піти до суду</b>");

    var allHints = $("button.myHint").addClass("hide");
    $(this).closest(".card").find(".choice").removeClass("hide");
});

//для третього питання 5 блоку, коли наступна картка залежить від вибору
$(".step").on("click", function () {
    var cardClass = $(this).attr("value");
    var allHidden = $(".hiddenCard");
    var targetCard;
    for (var i = 0; i < allHidden.length; i++) {
        if ($(allHidden[i]).hasClass(cardClass)) {
            targetCard = allHidden[i];

        }
    }

    $("#replacement").remove();
    $(targetCard).find("li").css("height", "200px");
    $(targetCard).addClass("last").css('display', "block")
});


//закриваємо модальне вікно
$("button#play").on("click", function () {
    $("#myModal").remove();
    // buttonPosition(cards1);

});


//вираховуємо li.height для кожної картки
// var buttonPosition = function (blockNumber) {
//     for (var i = 0; i < blockNumber.length; i++) {
//         var h3Title = $(blockNumber[i]).find("h3")[0].getBoundingClientRect();
//         var h3Height = h3Title.height + 20;
//         var containerHeight = $(blockNumber[i])[0].getBoundingClientRect();
//         containerHeight = containerHeight.height;
//         var liHeight;
//         if(window.innerWidth < 380){
//             liHeight = containerHeight - h3Height - 50 - 100;
//         }
//         else {
//             liHeight = containerHeight - h3Height - 50 - 25;
//         }
//
//         var allListsInCard = $(blockNumber[i]).find("li");
//         for (var n = 0; n < allListsInCard.length; n++) {
//             $(allListsInCard[n]).css("height", liHeight)
//         }
//     }
// };

function swapStyleSheet() {
    $("#mediaLogo").css("background-color", hex);
    $("#messenger").css("border-color", hex);
    $(".card").css("border-color", hex);
    $("#spiral").css("background-color", hex);
    $("button.answerYes, button.choice, button.next, button.error, button.myHint, button.answerNo, button.noThanks").css("border-color", hex);
    $("button.answerYes, button.choice, button.next, button.error, button.myHint, button.answerNo, button.noThanks").css("color", hex);

}


//функція переносить лого з картки вибору наверх над чатом з анімацією.
function func (target) {
    var image = document.getElementById('logoId');
    var current = image.closest("li");
    var rectImage = $(current)[0].getBoundingClientRect();
    var rectTarget = $(target)[0].getBoundingClientRect();
    evalRect (rectImage);
    evalRect (rectTarget);

    var scaleX = rectImage.width / rectTarget.width;
    var scaleY = rectImage.height / rectTarget.height;
    var translateX = rectImage.centerX - rectTarget.centerX;
    var translateY = rectImage.centerY - rectTarget.centerY;

    var dup = image.cloneNode();
    var scale = 'scale(' + scaleX + ', ' + scaleY + ') ';
    var translate = 'translate(' + translateX + 'px, ' + translateY + 'px) ';
    $(target).append(dup);
    dup.style.transform = translate + scale;

}

function evalRect (rect) {
    rect.centerX = rect.left + rect.width * 0.5;
    rect.centerY = rect.top + rect.height * 0.5;
}

//рахуємо максимально і мінімально можливу кільксть балів, а також інтервали для кожного результату

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

var allClassList = $(".parentForSlider").map(function () {
    return $(this).attr("class").split(' ')[0];
}).get();
allClassList = allClassList.filter(onlyUnique);
listOfMinValues = [];
listOfMaxValues = [];
for (var i = 0; i < allClassList.length; i++) {
    var valueArray = $("." + allClassList[i]).map(function () {
        return $(this).attr("value");
    }).get();
    valueArray = valueArray.map(Number);
    var minValue = Math.min.apply(Math, valueArray);
    listOfMinValues.push(minValue);
    var maxValue = Math.max.apply(Math, valueArray);
    listOfMaxValues.push(maxValue);
}

var sumOfMin = listOfMinValues.reduce(function (a, b) {
    return a + b;
}, 0);
var sumOfMax = listOfMaxValues.reduce(function (a, b) {
    return a + b;
}, 0);

var resultInterval = (sumOfMax - sumOfMin) / 5;
console.log(sumOfMax);
console.log(sumOfMin);
console.log(resultInterval);


//верхня межа mainDezinformer
var mainDezinformer = sumOfMax;
console.log("дезинформатор" + mainDezinformer);

//верхня межа vandal
var vandal = sumOfMin + (resultInterval * 4);
console.log(vandal);

//верхня межа paidJournalist
var paidJournalist = sumOfMin + (resultInterval * 3);
console.log(paidJournalist);

//верхня межа trashAggregator
var trashAggregator = sumOfMin + (resultInterval * 2);
console.log(trashAggregator);

//верхня межа sissy
var sissy = sumOfMin + resultInterval;
console.log(sissy);


$(".toResult").on("click", function() {
        if(currentTotalPoints > vandal) {
            $("#rank").html("ГОЛОВНИЙ ДЕЗИНФОРМАТОР КРАЇНИ");
            $("#face").attr("src", "img/dezinfo.png");
            $("#facebook")
                .find("a.share-btn")
                .attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/manipulator-game/share/dezinfo.html");
            $("#twitter")
                .find("a.share-btn")
                .attr("href", "https://twitter.com/intent/tweet?text=http://texty.org.ua/d/manipulator-game/share/dezinfo.html");
    }
    if(currentTotalPoints > paidJournalist && currentTotalPoints <= vandal) {
        $("#rank").html("ІНФОРМАЦІЙНИЙ ВАНДАЛ");
        $("#face").attr("src", "img/vandal.png");
        $("#facebook")
            .find("a.share-btn")
            .attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/manipulator-game/share/vandal.html");
        $("#twitter")
            .find("a.share-btn")
            .attr("href", "https://twitter.com/intent/tweet?text=http://texty.org.ua/d/manipulator-game/share/vandal.html");
    }
    if(currentTotalPoints > trashAggregator && currentTotalPoints <= paidJournalist) {
        $("#rank").html("УСПІШНИЙ ДЖИНСОВИК");
        $("#face").attr("src", "img/jeans.png");
        $("#facebook")
            .find("a.share-btn")
            .attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/manipulator-game/share/jeans.html");
        $("#twitter")
            .find("a.share-btn")
            .attr("href", "https://twitter.com/intent/tweet?text=http://texty.org.ua/d/manipulator-game/share/jeans.html");

    }
    if(currentTotalPoints > sissy && currentTotalPoints <= trashAggregator) {
        $("#rank").html("АГРЕГАТОР ТРЕШНЯКУ");
        $("#face").attr("src", "img/agregator.png");
        $("#facebook")
            .find("a.share-btn")
            .attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/manipulator-game/share/trash.html");
        $("#twitter")
            .find("a.share-btn")
            .attr("href", "https://twitter.com/intent/tweet?text=http://texty.org.ua/d/manipulator-game/share/trash.html");

    }
    if(currentTotalPoints <= sissy) {
        $("#rank").html("ЧИСТОПЛЮЙ");
        $("#face").attr("src", "img/chystoplju.png");
        $("#facebook")
            .find("a.share-btn")
            .attr("href", "https://www.facebook.com/sharer/sharer.php?u=http://texty.org.ua/d/manipulator-game/share/chystopliui.html");
        $("#twitter")
            .find("a.share-btn")
            .attr("href", "https://twitter.com/intent/tweet?text=http://texty.org.ua/d/manipulator-game/share/chystopliui.html");

        $("#theResult").text("Ваше сумління не дає вам працювати ефективно. Так ви довго не протягнете. Забудьте про стандарти журналістики, їх вже немає")
    }

    if(window.innerWidth < 825) {
        $("#logomob").remove();
        $("#spiralmob").remove();
        $("#messenger").remove();
    }

    $("#resultContainer").css("display", "block");
    $("#gameRate").css("display", "inline");

});



var p = document.querySelector('#letterH');
var p2 = document.querySelector('#letterH2');

function findHeight(element) {
    return element.clientHeight;
}

var picSpiralHeight = findHeight(p);

$("#inlineSpiral > img")
    .css("height", picSpiralHeight)
    .css("width", picSpiralHeight)
    .css("display", "inline-block");

$("#inlineSpiral2 > img")
    .css("height", picSpiralHeight)
    .css("width", picSpiralHeight)
    .css("display", "inline-block");



//     var thisArray = $('.cardOnBackground');
//     for (var j = 0; j < thisArray.length; j++ ){
//         $(thisArray[j]).css("height", function () {
//             var jHeight = getRandomNumber(20, 40, 5);
//             return jHeight + "%";
//
//         })
//
// }

//генерує випадкове між двома числами
function getRandomNumber(start, end, increments) {
    var numbers = [];
    for(var n = start; n <= end; n += increments) {
        numbers.push(n);
    }

    var randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
}

