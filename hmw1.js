const prompt = require('prompt-sync')({ sigint: true });

function logo_Util(logo_name, directions) {

    function createLogo(logoList) {
        let length = logoList.length > 0 ? logoList.length : 1;
        let alreadyContains = false;
        for (let a = 0; a < length; a++) {
            if (logoList.length == 0) {
                logoList.push({
                    "logo_name": logo_name,
                    "directions": directions,
                    "starting_coordinates": ["", ""]
                });
                console.log(logoList[0]["logo_name"] + " defined");
                alreadyContains = true;
                break; // trial
            }
            else {
                for (let i = 0; i < logoList.length; i++) {
                    if (logoList[i]["logo_name"] === logo_name) {
                        alreadyContains = true;
                        console.log(logo_name + " is already defined");
                        break;
                    }
                }
                break;
            }
        }
        if (alreadyContains === false) {
            logoList.push({
                "logo_name": logo_name,
                "directions": directions,
                "starting_coordinates": ["", ""]
            });
            console.log(logo_name + " defined");
        }
    }
    return createLogo;
}

function engrave_Logo(logo_list, logo_name, x, y) {

    const mirror2DArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    let vertical = "|";
    let horizontal = "-";
    let isAlreadyContain = false;
    let length = logo_list.length > 0 ? logo_list.length : 1;;
    for (let u = 0; u < length; u++) {
        if (logo_list.length === 0) {
            console.log("You didn't enter any logo");
            return unchanged_Grid;
        }
        else if (logo_list[u]['logo_name'] === logo_name) {
            isAlreadyContain = true;

            function update_Grid(matrix) {
                const mirror2DArray = matrix;
                for (let b = 0; b < logo_list.length; b++) {
                    if (logo_name == logo_list[b]["logo_name"]) {
                        logo_list[b]["starting_coordinates"][0] = x;
                        logo_list[b]["starting_coordinates"][1] = y;
                        const coordinates = [x, y];
                        const listOfDirection = logo_list[b]["directions"];

                        const current_coordinates = coordinates;

                        current_coordinates[0] = parseInt(parseInt(current_coordinates[0]) - 1) * 2; // indices starts with 0  0 so it appriopriate for 1 1
                        current_coordinates[1] = parseInt(parseInt(current_coordinates[1]) - 1) * 2;
                        let exceedGrid = false;

                        for (let c = 0; c < listOfDirection.length; c++) {
                            if (current_coordinates[0] > 20 || current_coordinates[0] < 0 ||
                                current_coordinates[1] > 20 || current_coordinates[1] < 0) {
                                if (x === "0" && y === "0") {
                                    console.log("Grid starts with [1,1]");
                                }
                                else {
                                    console.log("Starting points exceeds the Grid.");
                                }
                                exceedGrid = true;
                                break;
                            }
                            else {
                                if (listOfDirection[c] === "D") {
                                    if (current_coordinates[0] <= 18) {
                                        mirror2DArray[current_coordinates[0] + 1][current_coordinates[1]] = vertical;
                                        current_coordinates[0] = ((parseInt(current_coordinates[0]) + 2));
                                    } else {
                                        console.log("Your direction exceeds from the grid.");
                                        exceedGrid = true;
                                        break;
                                    }
                                }
                                else if (listOfDirection[c] === "U") {
                                    if (current_coordinates[0] > 1) {
                                        mirror2DArray[current_coordinates[0] - 1][current_coordinates[1]] = vertical;
                                        current_coordinates[0] = ((parseInt(current_coordinates[0]) - 2));
                                    }
                                    else {
                                        console.log("Your direction exceeds from the grid.");
                                        exceedGrid = true;
                                        break;
                                    }
                                }
                                else if (listOfDirection[c] === "R") {
                                    if (current_coordinates[1] <= 18) {
                                        mirror2DArray[current_coordinates[0]][current_coordinates[1] + 1] = horizontal;
                                        current_coordinates[1] = ((parseInt(current_coordinates[1]) + 2));
                                    }
                                    else {
                                        console.log("Your direction exceeds from the grid.");
                                        exceedGrid = true;
                                        break;
                                    }
                                }

                                else if (listOfDirection[c] === "L") {
                                    if (current_coordinates[1] > 1) {
                                        mirror2DArray[current_coordinates[0]][current_coordinates[1] - 1] = horizontal;
                                        current_coordinates[1] = ((parseInt(current_coordinates[1]) - 2));
                                    }
                                    else {
                                        console.log("Your direction exceeds from the grid.");
                                        exceedGrid = true;
                                        break;
                                    }
                                }
                            }
                        }
                        if (exceedGrid === false) {
                            printGrid(matrix, 21, 21);
                            return mirror2DArray;
                        }
                    }

                }
            }
        }
        function unchanged_Grid() { //Grid Unchanged
            return logo_list;
        }
    }
    if (isAlreadyContain === true) {
        return update_Grid;
    }

    else {
        console.log(logo_name + " is not defined."); //Output Problem
        return unchanged_Grid;
    }
}

function is_Logos_Same(logo_list, logo1, logo2) {
    let length = logo_list.length > 0 ? logo_list.length : 1;
    let contain_2_Logo = 0;
    const comparedLogoList = [];
    if (logo1 === logo2) {
        console.log("Yes");
    }
    else {
        ///Continue Here With Else Case.
        for (let a = 0; a < length; a++) {
            if (logo_list.length == 0) {
                console.log("You did not enter any LOGO");
                return null;
            }
            else {
                let flagg = false;
                for (let a = 0; a < logo_list.length; a++) {
                    if (logo_list[a]["logo_name"] === logo1) {
                        flagg = true;
                    } else if (logo_list[a]["logo_name"] === logo2) {
                        flagg = true;
                    }
                }

                if (logo_list[a]["logo_name"] === logo1 || logo_list[a]["logo_name"] === logo2) {
                    comparedLogoList.push(logo_list[a]);
                    contain_2_Logo++;
                }
            }
        }
        if (contain_2_Logo === 2) {
            const logo1_directions = comparedLogoList[0]["directions"];
            const logo2_directions = comparedLogoList[1]["directions"];
            //Minimize direction amount
            const edge_list = [];
            let x = 0;
            let y = 0;
            for (let j = 0; j < logo1_directions.length; j++) {
                if (logo1_directions[j] === "D") { // Couldn't we use charAt()??*
                    let founded = false;
                    for (let l = 0; l < edge_list.length; l++) {
                        if ((((edge_list[l]["ending_points"][0] === x && edge_list[l]["ending_points"][1] === y) &&
                            (edge_list[l]["starting_points"][0] === x && edge_list[l]["starting_points"][1] === y - 1)) ||
                            ((edge_list[l]["starting_points"][0] === x && edge_list[l]["starting_points"][1] === y) &&
                                (edge_list[l]["ending_points"][0] === x && edge_list[l]["ending_points"][1] === y - 1)))) {
                            founded = true;
                            y--;
                        }
                    }
                    if (founded === false) {
                        edge_list.push({
                            "edge_number": edge_list.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x, y - 1],
                            "move": "D",
                            "vertical/horizontal": "V"
                        });
                        y--;
                    }
                }
                else if (logo1_directions[j] === "U") {
                    let founded = false;
                    for (let k = 0; k < edge_list.length; k++) {
                        if ((((edge_list[k]["ending_points"][0] === x && edge_list[k]["ending_points"][1] === y) &&
                            (edge_list[k]["starting_points"][0] === x && edge_list[k]["starting_points"][1] === y + 1)) ||
                            ((edge_list[k]["starting_points"][0] === x && edge_list[k]["starting_points"][1] === y) &&
                                (edge_list[k]["ending_points"][0] === x && edge_list[k]["ending_points"][1] === y + 1)))) {
                            founded = true;
                            y++;
                        }
                    }
                    if (founded === false) {
                        edge_list.push({
                            "edge_number": edge_list.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x, y + 1],
                            "move": "U",
                            "vertical/horizontal": "V"
                        });
                        y++;
                    }
                }
                else if (logo1_directions[j] === "R") {
                    let founded = false;
                    for (let m = 0; m < edge_list.length; m++) {
                        if ((((edge_list[m]["ending_points"][0] === x && edge_list[m]["ending_points"][1] === y) &&
                            (edge_list[m]["starting_points"][0] === x + 1 && edge_list[m]["starting_points"][1] === y)) ||
                            ((edge_list[m]["starting_points"][0] === x && edge_list[m]["starting_points"][1] === y) &&
                                (edge_list[m]["ending_points"][0] === x + 1 && edge_list[m]["ending_points"][1] === y)))) {
                            founded = true;
                            x++;
                        }
                    }
                    if (founded === false) {
                        edge_list.push({
                            "edge_number": edge_list.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x + 1, y],
                            "move": "R",
                            "vertical/horizontal": "V"
                        });
                        x++;
                    }
                }
                else if (logo1_directions[j] === "L") {
                    let founded = false;
                    for (let q = 0; q < edge_list.length; q++) {
                        if ((((edge_list[q]["ending_points"][0] === x && edge_list[q]["ending_points"][1] === y) &&
                            (edge_list[q]["starting_points"][0] === x - 1 && edge_list[q]["starting_points"][1] === y)) ||
                            ((edge_list[q]["starting_points"][0] === x && edge_list[q]["starting_points"][1] === y) &&
                                (edge_list[q]["ending_points"][0] === x - 1 && edge_list[q]["ending_points"][1] === y)))) {
                            founded = true;
                            x--;
                        }
                    }
                    if (founded === false) {
                        edge_list.push({
                            "edge_number": edge_list.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x - 1, y],
                            "move": "L",
                            "vertical/horizontal": "H"
                        });
                        x--;
                    }
                }
            }

            x = 0;
            y = 0;
            const edge_list2 = [];

            for (let j = 0; j < logo2_directions.length; j++) {

                if (logo2_directions[j] === "D") {
                    let founded = false;
                    for (let l = 0; l < edge_list2.length; l++) {
                        if ((((edge_list2[l]["ending_points"][0] === x && edge_list2[l]["ending_points"][1] === y) &&
                            (edge_list2[l]["starting_points"][0] === x && edge_list2[l]["starting_points"][1] === y - 1)) ||
                            ((edge_list2[l]["starting_points"][0] === x && edge_list2[l]["starting_points"][1] === y) &&
                                (edge_list2[l]["ending_points"][0] === x && edge_list2[l]["ending_points"][1] === y - 1)))) {
                            founded = true;
                            y--;
                        }
                    }
                    if (founded === false) {
                        edge_list2.push({
                            "edge_number": edge_list2.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x, y - 1],
                            "move": "D",
                            "vertical/horizontal": "V"
                        });
                        y--;
                    }
                }
                else if (logo2_directions[j] === "U") {
                    let founded = false;
                    for (let k = 0; k < edge_list2.length; k++) {
                        if ((((edge_list2[k]["ending_points"][0] === x && edge_list2[k]["ending_points"][1] === y) &&
                            (edge_list2[k]["starting_points"][0] === x && edge_list2[k]["starting_points"][1] === y + 1)) ||
                            ((edge_list2[k]["starting_points"][0] === x && edge_list2[k]["starting_points"][1] === y) &&
                                (edge_list2[k]["ending_points"][0] === x && edge_list2[k]["ending_points"][1] === y + 1)))) {
                            founded = true;
                            y++;
                        }
                    }
                    if (founded === false) {
                        edge_list2.push({
                            "edge_number": edge_list2.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x, y + 1],
                            "move": "U",
                            "vertical/horizontal": "V"
                        });
                        y++;
                    }
                }
                else if (logo2_directions[j] === "R") {
                    let founded = false;
                    for (let m = 0; m < edge_list2.length; m++) {
                        if ((((edge_list2[m]["ending_points"][0] === x && edge_list2[m]["ending_points"][1] === y) &&
                            (edge_list2[m]["starting_points"][0] === x + 1 && edge_list2[m]["starting_points"][1] === y)) ||
                            ((edge_list2[m]["starting_points"][0] === x && edge_list2[m]["starting_points"][1] === y) &&
                                (edge_list2[m]["ending_points"][0] === x + 1 && edge_list2[m]["ending_points"][1] === y)))) {
                            founded = true;
                            x++;
                        }
                    }
                    if (founded === false) {
                        edge_list2.push({
                            "edge_number": edge_list2.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x + 1, y],
                            "move": "R",
                            "vertical/horizontal": "V"
                        });
                        x++;
                    }
                }
                else if (logo2_directions[j] === "L") {
                    let founded = false;
                    for (let q = 0; q < edge_list2.length; q++) {
                        if ((((edge_list2[q]["ending_points"][0] === x && edge_list2[q]["ending_points"][1] === y) &&
                            (edge_list2[q]["starting_points"][0] === x - 1 && edge_list2[q]["starting_points"][1] === y)) ||
                            ((edge_list2[q]["starting_points"][0] === x && edge_list2[q]["starting_points"][1] === y) &&
                                (edge_list2[q]["ending_points"][0] === x - 1 && edge_list2[q]["ending_points"][1] === y)))) {
                            founded = true;
                            x--;
                        }
                    }
                    if (founded === false) {
                        edge_list2.push({
                            "edge_number": edge_list2.length + 1,
                            "starting_points": [x, y],
                            "ending_points": [x - 1, y],
                            "move": "L",
                            "vertical/horizontal": "H"
                        });
                        x--;
                    }
                }
            }

            if (edge_list.length == edge_list2.length) {

                const coordinate_list1 = [];
                const coordinate_list2 = [];
                let match = 0;
                let same = false;
                for (let z = 0; z < edge_list.length; z++) {
                    if (coordinate_list1.includes(edge_list[z]["ending_points"]) === false) {
                        coordinate_list1.push(edge_list[z]["ending_points"]);
                    }
                    if (coordinate_list2.includes(edge_list2[z]["ending_points"]) === false) {
                        coordinate_list2.push(edge_list2[z]["ending_points"]);
                    }
                }
                for (let y = 0; y < 4; y++) {
                    for (let u = 0; u < coordinate_list1.length; u++) {
                        let found = false;
                        for (let c = 0; c < coordinate_list2.length; c++) {
                            if (coordinate_list2[c][0] === coordinate_list1[u][0] && coordinate_list2[c][1] === coordinate_list1[u][1]) {
                                found = true;
                            }
                        }
                        if (found) { //coordinate_list2.includes(coordinate_list1[u])
                            if (match === coordinate_list1.length) {
                                same = true;
                            }
                            else {
                                match++;
                            }
                        }
                        else {
                            let temp = coordinate_list1[u][0];
                            coordinate_list1[u][0] = coordinate_list1[u][1];
                            coordinate_list1[u][1] = temp * (-1);
                            // y=0?
                        }
                    }
                    if (same === true) {
                        console.log("Yes");
                        break;
                    }
                }

                if (same === false) {
                    console.log("No");
                }
            }
            else { //İf length of edges are not equal
                //console.log("Edges are not equal");
                console.log("No");
            }
        }
        else {
            console.log("Not all logos are defined before.");
        }
    }
}
function printGrid(grid, row, column) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            process.stdout.write(grid[i][j]);
        }
        console.log("");
    }
}
function createGrid() {
    let charDot = "."
    let charSpace = " ";
    const matrix = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 11; j++) {
            if (i % 2 != 0) {
                matrix[i].push(charSpace);
                if (j != 10) {
                    matrix[i].push(charSpace);
                }
            }
            else {
                matrix[i].push(charDot);  //all coordinates
                if (j != 10) {
                    matrix[i].push(charSpace); //odd indexes are direction incices
                }
            }
        }
    }
    return matrix;
}

/**
 * DRIVER PART OF THE CODE
 * */

const list_of_logos = [];
let inputString = prompt("Enter an Input (Press 'q' for exit): ");
while ((inputString != "q")) { //|| inputString != "Q"
    const argsArray = inputString.split(" ");
    let list_of_matrix = createGrid();
    if (argsArray[0] === "LOGO") {
        if (argsArray.length != 3) {
            console.log("You entered less or extra property for LOGO command");
        } else {
            let logo_name = argsArray[1];
            let directions = argsArray[2];
            let check_directions = false;

            for (let a = 0; a < directions.length; a++) {
                if (!(directions.charAt(a).toUpperCase() === "U" || directions.charAt(a).toUpperCase() === "D" || directions.charAt(a).toUpperCase() === "R" || directions.charAt(a).toUpperCase() === "L")) {
                    check_directions = true;
                }
            }
            if (check_directions === true) {
                console.log(directions + " includes wrong type of directions");
            } else {
                const logo_list = logo_Util(logo_name, directions);
                logo_list(list_of_logos);
            }
        }
    }
    else if (argsArray[0] === "ENGRAVE") {
        if (argsArray.length != 4) {
            console.log("You entered less or extra property for ENGRAVE command");
        } else {
            let engraved_logo_name = argsArray[1];
            let x_coordinate = argsArray[2];
            let y_coordinate = argsArray[3];
            const update_matrix = engrave_Logo(list_of_logos, engraved_logo_name, x_coordinate, y_coordinate);
            list_of_matrix = update_matrix(list_of_matrix);
        }
    }
    else if (argsArray[0] === "SAME") {
        // console.log(list_of_logos);
        if (argsArray.length != 3) {
            console.log("You entered less or extra property for SAME command");
        }
        else {
            let logo_name1 = argsArray[1];
            let logo_name2 = argsArray[2];
            is_Logos_Same(list_of_logos, logo_name1, logo_name2);
        }
    }
    else {
        console.log("Entered Wrong Input");
    }
    inputString = prompt("Enter an Input (Press 'q' for exit): ");
}