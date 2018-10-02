var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
var rowID;

$("#showUserRate").on("click", function () {
        $('.result').css("display", "none");
        $('#usersRate').css("display", "block");

        // Замість 7777 повинно бути число балів
        api.submitAndGetUsers("Тут повинно бути ім'я гравця", 7777, function(data){
    
            var table = d3.select('#usersRate').append('table');
            var thead = table.append('thead');
            var tbody = table.append('tbody');

            data = data.sort(function (a, b) {
                return +b.score - +a.score;
            });

            var usersId = data.map(function (d) {
                   return  d.id
            });

            var lastUser = d3.max(d3.values(usersId));

            // append the header row
            thead.append('tr').selectAll('th')
                .data(["Місце", "Ім'я", "Бали", "Результат"]).enter()
                .append('th')
                .style("color", "yellow")
                .style("display", "sticky")
                .style("top", "10px")
                .text(function (d) {
                    return d;
                });

            // create a row for each object in the data
            var rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr');

            rows.append('td')
                .style("color", function (d) {
                    if (d.id === lastUser) { return "red" }
                    else { return "white" }
                })
                .text(function (d, i) {
                    return i+1;
                });


            rows.append('td')
                .style("color", function (d) {
                    if (d.id === lastUser) { return "red" }
                    else { return "white" }
                })
                .text(function (d) {
                    return d.name;
                });


            rows.append('td')
                .style("color", function (d) {
                    if (d.id === lastUser) { return "red" }
                    else { return "white" }
                })
                .text(function (d) {
                    return d.score;
                });

            // //Add the spark chart.
            rows.append('td')
                .style("color", function (d) {
                    if (d.id === lastUser) { return "red" }
                    else { return "white" }
                })
                .attr("id", function(d){
                    if (d.id === lastUser) {
                        rowID = d.id;
                    }
                        return  d.id

                })
                .text(function (d) {
                    if (d.score > vandal) {
                        return "Головний дезінформатор";
                    }
                    if (d.score > paidJournalist && d.score <= vandal) {
                        return "Інформаційний вандал";
                    }
                    if (d.score > trashAggregator && d.score <= paidJournalist) {
                        return "Успішний джинсовик";
                    }
                    if (d.score > sissy && d.score <= trashAggregator) {
                        return "Агрегатор трешняку"
                    }
                    if (d.score <= sissy) {
                        return "Чистоплюй"
                    }
                });


        });


        //cкролимо на червоний рядок
        if (rowID) {
            var topPosition = document.getElementById('lastUser').offsetTop;
            document.getElementById('usersRate').scrollTop = topPosition;
        }
        if (!rowID) {
            setTimeout(function () {
                var topPosition = document.getElementById(rowID).offsetTop;
                document.getElementById('usersRate').scrollTop = topPosition;
            }, 200)
        }

        $("#gameRate").css("display", "none");
        $("#returnToResult").css("display", "block")

});


$("#returnToResult").on("click", function() {

    $('.result').css("display", "block");
    $('#usersRate').css("display", "none");
    $('#returnToResult').css("display", "none");
    $("div.username").css("display", "none");
    $("#pleasePutYourName").html("Поділитись результатом в соціальних мережах");
    // $("#gameRate").find("input#uname").remove();
    // $("#gameRate").css("display", "inline");
});


