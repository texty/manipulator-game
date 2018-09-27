var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;
var rowID;

$("#showUserRate").on("click", function () {
        $('.result').css("display", "none");
        $('#usersRate').css("display", "block");

        d3.json('data/users.json', function (error, data) {

            var table = d3.select('#usersRate').append('table');
            var thead = table.append('thead');
            var tbody = table.append('tbody');

            data = data.sort(function (a, b) {
                return +b.score - +a.score;
            });
            var timeArray = data.map(function (d) {
                return parseDate(d.time)
            });

            var latestUser = d3.max(d3.values(timeArray));

            // append the header row
            thead.append('tr').selectAll('th')
                .data(["Ім'я", "Бали", "Результат"]).enter()
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
                    var theTime = parseDate(d.time);
                    if (theTime.getTime() === latestUser.getTime()) {
                        return "red"
                    }
                    else {
                        return "white"
                    }

                })
                .text(function (d) {
                    return d.name;
                });


            rows.append('td')
                .style("color", function (d) {
                    var theTime = parseDate(d.time);
                    if (theTime.getTime() === latestUser.getTime()) {
                        return "red"
                    }
                    else {
                        return "white"
                    }

                })
                .text(function (d) {
                    return d.score;
                });

            //Add the spark chart.
            rows.append('td')
                .style("color", function (d) {
                    var theTime = parseDate(d.time);
                    if (theTime.getTime() === latestUser.getTime()) {
                        return "red"
                    }
                    else {
                        return "white"
                    }

                })
                .attr("id", function (d) {
                    var theTime = parseDate(d.time);
                    if (theTime.getTime() === latestUser.getTime()) {
                        rowID = d.id;
                    }
                    return d.id
                })
                .text(function (d) {
                    return d.result;
                })

        });


        //cкролимо на червоний рядок
        if (rowID) {
            var topPosition = document.getElementById('user15').offsetTop;
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
    // $("#gameRate").find("input#uname").remove();
    // $("#gameRate").css("display", "inline");
});


