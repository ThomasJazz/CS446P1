var lg = ["Salmon", "Russet potatoes", "Pinto beans", "Cheddar cheese", "Milk", "Eggs", "Lamb", "Peaches", "Almonds",
    "Angel hair pasta", "Wild rice", "Pineapple", "Almond milk", "Swiss cheese", "Ciabatta bread",
    "White rice", "Lemon", "Lime", "Granola", "Vanilla yogurt"];
var rg = ["Beef", "Chicken", "Pork", "Carrot", "Sausage"];
var created = false;
var filtered = [];

// this function is called as soon as the modal 'show' function has been called
// only called upon initialization
$('#exampleModalCenter').on('show.bs.modal', function() {
    if(!created){
        // add all the values from the lg array into the left-group
        for (var i = 0; i < lg.length; i++){
            var mySelect = document.getElementById('left-group');
            var newOption = document.createElement('option');
            newOption.innerHTML = "<option>"+ lg[i] +"</option>";

            while (newOption.firstChild) {
                mySelect.appendChild(newOption.firstChild);
            }
        }

        // add all the values from the rg array into the left-group
        for (var i = 0; i < rg.length; i++){
            var mySelect = document.getElementById('right-group');
            var newOption = document.createElement('option');
            newOption.innerHTML = "<option>"+ rg[i] +"</option>";

            while (newOption.firstChild) {
                mySelect.appendChild(newOption.firstChild);
            }
        }
        created = true;
    }

    updateOutput(" ");
})

/* For when/if we decide to have the script pull from a file rather than hard coding in an array
$.getJSON("./res/user-data.json", function(json) {
    console.log(json);
})
*/

function moveToRight() {
    if ($("#left-group").val()){
        // temporarily store selected value(s)
        var value = $('#left-group').val();

        $('#left-group option:selected').remove();

        // we loop in case the user selects multiple options at once
        for (var i = 0; i < value.length; i++){
            var mySelect = document.getElementById('right-group');
            var newOption = document.createElement('option');
            newOption.innerHTML = "<option>"+ value[i] +"</option>";

            while (newOption.firstChild) {
                mySelect.appendChild(newOption.firstChild);
            }
        }
        updateGroupArrays();
    }
    updateOutput("Added item(s) to your pantry!");
}

function moveToLeft() {
    if ($("#right-group").val()){
        // temporarily store selected value(s)
        var value = $('#right-group').val();

        // remove selected values from the pantry
        $('#right-group option:selected').remove();

        // we loop in case the user selects multiple options at once
        for (var i = 0; i < value.length; i++){
            var mySelect = document.getElementById('left-group');
            var newOption = document.createElement('option');
            newOption.innerHTML = "<option>"+ value[i] +"</option>";

            while (newOption.firstChild) {
                mySelect.appendChild(newOption.firstChild);
            }
        }

        $("input#pantrySearchInput").keyup();
        updateGroupArrays();
    }
    updateOutput("Removed item(s) from your pantry!");
}

function appendLeft(input){
    var myGroup = document.getElementById('left-group');
    var newOption = document.createElement('option');
    newOption.innerHTML = "<option>"+ input +"</option>";

    while (newOption.firstChild) {
        myGroup.appendChild(newOption.firstChild);
    }
    updateOutput("Added item(s) to your pantry!");
}

// updates lg and rg arrays so that they are synced with the options in the select boxes
function updateGroupArrays(){
    lg = []; // clear lg of all elements
    var x = document.getElementById("left-group");
    for (var i = 0; i < x.length; i++) {
       lg.push(x.options[i].text); // push the items in the left box to the array
    }

    rg = []; // clear rg of all elements
    var y = document.getElementById("right-group");
    for (var i = 0; i < y.length; i++) {
        rg.push(y.options[i].text); // push the items in the right box to the array
    }
}

function updateOutput(input) {
    document.getElementById('lastPerformed').innerText = input;

    setTimeout(function () {
        document.getElementById('lastPerformed').innerText = "";
    }, 5000);
}
$("input#pantrySearchInput").keyup(function() {
    if ($('#pantrySearchInput').val() != ''){

        var x = document.getElementById('left-group');
        var searchVal = $('#pantrySearchInput').val();

        for (var i = 0; i < filtered.length; i++) {
            if (filtered[i].toLowerCase().includes(searchVal.toLowerCase())) {
                console.log(filtered[i] + " was added back to lg!");
                appendLeft(filtered[i]);
                filtered.splice(i,1);
                i--;
            }
        }

        console.log("Filtered from " + x.length + " items: ");
        for (var i = 0; i < x.length; i++) {
            if (!x.options[i].text.toLowerCase().includes(searchVal.toLowerCase())) {
                filtered.push(x.options[i].text);
                console.log(x.options[i].text);
                x.options.remove(i);
                console.log("x length: " + x.length);
                i--;
            }
        }

    } else {
        for (var i = 0; i < filtered.length; i++){
            appendLeft(filtered[i]);
        }
        filtered = [];
    }
    console.log("Filtered list: \n\t" + filtered);
    updateGroupArrays();
})
