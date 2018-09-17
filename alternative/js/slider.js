var modal = $('#myModal');
var modalImg = $("#img01");

// Get the modal
$('img:not(.gif):not(.img-responsive)').click(function() {
    var theClass = this.className;
    var imgArray = document.getElementsByClassName(theClass);
    var index = $(imgArray).index(this);
    modalImg.attr("src", this.src);
    modal.click(function() {
        modalImg.attr("src", this.src);
    });


    $('#next').click(function() {
        index = index + 1;
        if(index < imgArray.length) {
            modalImg.attr("src", imgArray[index].src);
        }


        if(index === imgArray.length) {
            index = 0;
            modalImg.attr("src", imgArray[index].src);
        }


    });


    $('#myModal').css("display","block");

});

var span = $("#close");

// When the user clicks on <span> (x), close the modal
$(".close").click(function() {
    $('#myModal').css("display","none");
})