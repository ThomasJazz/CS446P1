console.log(document.getElementById("left-group"));

//this function is called as soon as the modal 'show' function has been called
$('#exampleModalCenter').on('show.bs.modal', function() {
    // hard-coded arrays, will eventually store in database or plaintext file
    var lg = ["Fish", "Potatoes", "Beans", "Cheese", "Dairy", "Eggs", "Lamb", "Fruits", "Nuts", "Pasta", "Rice"];
    var rg = ["Beef", "Chicken", "Pork", "Carrot", "Sausage"];

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
})

function addIngredient() {
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

    }
}

function removeIngredient() {
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

    }
}