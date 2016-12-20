function drawGrid(rows,columns) {
    // set the row and column divs
    var $row = $("<div />", {
        class: 'row'
    });
    var $column = $("<div />", {
        class: 'column'
    });

    //set height and width dynamically for rows and columns
    $row.height(600/rows);
    $column.height(600/columns);
    $column.width(600/columns);

    //add columns to the the temp row object
    for (var i = 0; i < columns; i++) {
        $row.append($column.clone());
    }
    //clone the temp row object with the columns to the wrapper
    for (var i = 0; i < rows; i++) {
        $(".container").append($row.clone());
    }
};

function trail(color) {
    var opacity = 0;

    $(".container").on('mouseenter', '.column', function() {
        opacity += 0.1;

        if (opacity > 0 && opacity < 1) {
            $(this).css("opacity", opacity);
            $(this).css("background-color",color);
        }
        else if (opacity >= 1) {
            opacity = 0.1;
            $(this).css("opacity", opacity);
            $(this).css("background-color",color);
        }

    });

};


$(document).ready(function () {

    var rows = 16;
    var columns  = 16;

    drawGrid(rows,columns);

    // clear the grid on click
    $(".clear-grid").on('click', function(event) {
        $(".column").css("background","#FFFFFF");
        $(".column").css("opacity","1");
    });

    // user wants to create a new grid
    $(".new-grid").on('click', function(event) {

        var gridSize = prompt("Please provide the size for the new grid.");

        if (gridSize === null) {
            alert("Please enter a valid input.");
        }
        else {
            // remove grid before creating a new one
            $(".row").remove();

            rows = gridSize;
            columns = gridSize;

            drawGrid(rows,columns);
        }
    });

    $("#color-options").on('change', function(event) {

        var selectedColor = $("#color-options option:selected").val();

        switch(selectedColor) {
            case "eraser":
                $(".container").on('mouseenter', '.column', function() {
                    $(this).css("background","#FFFFFF");
                    $(this).css("opacity","1");
                });
                break;
            case "black":
                trail("black");
                break;
            case "green":
                trail("green");
                break;
            case "yellow":
                trail("yellow");
                break;
            case "red":
                trail("red");
                break;
            case "random":
                var opacity = 0;
                $(".container").on('mouseenter', '.column', function() {
                    var r = Math.floor(Math.random() * (256));
                    var g = Math.floor(Math.random() * (256));
                    var b = Math.floor(Math.random() * (256));
                    var randomColor =  'rgb('+ r +','+ g +','+ b +')';

                    opacity += 0.1;

                    if (opacity > 0 && opacity < 1) {
                        $(this).css("opacity", opacity);
                        $(this).css("background-color",randomColor);
                    }
                    else if (opacity >= 1) {
                        opacity = 0.1;
                        $(this).css("opacity", opacity);
                        $(this).css("background-color",randomColor);
                    }
                });

                break;
        }

    });

});
