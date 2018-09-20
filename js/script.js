//перекрашуємо картки в той самий колір через баг inherit
$(".card").css("border-color", "#6e9ae2");
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


//додаємо текст в месенджер
var newMessage = function (text) {
    var messenger = document.getElementById("messenger");
    var isScrolledToBottom = messenger.scrollHeight - messenger.clientHeight <= messenger.scrollTop + 1;
    var newElement = document.createElement("p");
    newElement.innerHTML = text;
    messenger.appendChild(newElement);
    if (isScrolledToBottom)
        messenger.scrollTop = messenger.scrollHeight - messenger.clientHeight;
};

//розташування карток одна під одною
var setSize = function (blockNumber) {
    $(".card").css("width", "500px").css("height", "350px");//повертаємо дескотопний розмір, якщо до цього була мобілка
    // var cardbox = $('.card')[0].getBoundingClientRect();
    var width = 500,
        height = 350;
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
};

//розташування для моб еканів
var setSizeMob = function () {
    $(".card").css("width", "85vw").css("margin-left", "10vw").css("height", "50vh").css("margin-top", "0");
    $("#blockList").css("display", "none")
};


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

window.addEventListener("resize", function () {
    if (window.innerWidth >= 800) {
        setSize(cards1);
        setSize(cards2);
        setSize(cards3);
        setSize(cards4);
        setSize(cards5);
        setSize(cards6);
    }
    if(window.innerWidth < 800){
        setSizeMob()
    }


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
    var oldMessages = $("#messenger p").css("color", "grey");
    newMessage(messengerInfo);
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
    if(window.innerWidth > 800){
        func ("#mediaLogo");
    }
    if(window.innerWidth <= 800){
        func("#logomob");
    }
    mediaImgSource = $(this).parent().find("img").attr("src");
    $("#logomob").html("<img id='logoIdMob' src="+mediaImgSource+"/>");
    hex = $(this).parent().find("img").attr("name");
    swapStyleSheet();
    $('h3 b#myMedia').html(media);
});


//Перехід між блоками
$(".next").on("click", function () {
    var containerForRemove = $(this)
        .parent()
        .parent()
        .parent()
        .parent();
    containerForRemove.css("display", "none");//видаляємо картку, яка вже непотрібна


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
        buttonPosition(cards2);
        buttonPosition(cards3);
        buttonPosition(cards4);
        buttonPosition(cards5);
        buttonPosition(cards6);

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
    if ($(this).hasClass("answerYes")) {
        messengerInfo = $(this).parent().find("p.additionalInfoYes").html();
        $("#messenger p").css("color", "grey");
        newMessage(messengerInfo);
    }

    if ($(this).hasClass("answerNo")) {
        messengerInfo = $(this).parent().find("p.additionalInfoNo").html();
        $("#messenger p").css("color", "grey");
        newMessage(messengerInfo);
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
    buttonPosition(cards1);

});


//вираховуємо li.height для кожної картки
var buttonPosition = function (blockNumber) {
    for (var i = 0; i < blockNumber.length; i++) {
        var h3Title = $(blockNumber[i]).find("h3")[0].getBoundingClientRect();
        var h3Height = h3Title.height + 20;
        var containerHeight = $(blockNumber[i])[0].getBoundingClientRect();
        containerHeight = containerHeight.height;
        var liHeight;
        if(window.innerWidth < 380){
            liHeight = containerHeight - h3Height - 50 - 100;
        }
        else {
            liHeight = containerHeight - h3Height - 50 - 25;
        }

        var allListsInCard = $(blockNumber[i]).find("li");
        for (var n = 0; n < allListsInCard.length; n++) {
            $(allListsInCard[n]).css("height", liHeight)
        }
    }
};

function swapStyleSheet() {
    $("#mediaLogo").css("background-color", hex);
    $("#messenger").css("border-color", hex);
    $(".card").css("border-color", hex);
    // $(".card").setPseudo(":before", "border-color", hex);
    // $(".card").setPseudo(":after", "border-color", hex);


    $("#spiral").css("background-color", hex);
}


// (function ($) {
//     jQuery.fn.extend({
//         getPseudo: function (pseudo, prop) {
//             var props = window.getComputedStyle(
//                 $(this.selector).get(0), pseudo
//             ).getPropertyValue(prop);
//             return String(props);
//         },
//         setPseudo: function (_pseudo, _prop, newprop) {
//             var elem = $(this);
//             var s = $("style");
//             var p = elem.getPseudo(_pseudo, _prop);
//             console.log(p)
//             var r = p !== "" ? new RegExp(p) : false;
//             var selector = $.map(elem, function (val, key) {
//                 return [val.tagName, val.id
//                     ? "#" + val.id : null, val.className ? "." + val.className
//                     : null]
//             });
//             var _setProp = "\n" + selector.join("")
//                     .concat(_pseudo)
//                     .concat("{")
//                     .concat(_prop + ":")
//                     .concat(newprop + "};");
//             ((!!r ? r.test($(s).text()) : r) ? $(s).text(function (index, prop) {
//                 return prop.replace(r, newprop)
//             }) : $(s).append(_setProp));
//             return this
//         }
//     })
// })(jQuery);

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
console.log(mainDezinformer);

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
    if(currentTotalPoints > vandal &&currentTotalPoints <= sumOfMax) {
        $("#rank").html("ГОЛОВНИЙ ДЕЗИНФОРМАТОР КРАЇНИ");
        $("#face").attr("src", "img/dezinfo.png")
    }
    if(currentTotalPoints > paidJournalist && currentTotalPoints <= vandal) {
        $("#rank").html("ІНФОРМАЦІЙНИЙ ВАНДАЛ");
        $("#face").attr("src", "img/vandal.png")
    }
    if(currentTotalPoints > trashAggregator && currentTotalPoints <= paidJournalist) {
        $("#rank").html("УСПІШНИЙ ДЖИНСОВИК");
        $("#face").attr("src", "img/jeans.png")
    }
    if(currentTotalPoints > sissy && currentTotalPoints <= trashAggregator) {
        $("#rank").html("АГРЕГАТОР ТРЕШНЯКУ");
        $("#face").attr("src", "img/agregator.png")
    }
    if(currentTotalPoints <= sissy) {
        $("#rank").html("ЧИСТОПЛЮЙ");
        $("#face").attr("src", "img/chystoplju.png");
        $("#theResult").text("Ваше сумління не дає вам працювати ефективно. Так ви довго не протягнете. Забудьте про стандарти журналістики, їх вже немає")
    }

    if(window.innerWidth < 800) {
        $("#logomob").remove();
        $("#spiralmob").remove();
        $("#messenger").remove();
    }
    $(".result").css("display", "block");
});