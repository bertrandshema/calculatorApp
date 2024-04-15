const keys = document.querySelectorAll('.key');
const inputDisplay = document.getElementById('input');
const output = document.getElementById('output');

const clearData = document.getElementById('clear');
const deleteData = document.getElementById('delete');

let input ="";

clearData.addEventListener('click', () => {
    inputDisplay.innerHTML = "";
    output.innerHTML = "";
})


for(let key of keys){
    const value = key.dataset.key;
    key.addEventListener('click', () => {
        if(value == "del"){
            input = input.slice(0, -1);
            inputDisplay.innerHTML = CleanInput(input);
        }
        else if(value == "clear"){
            inputDisplay.innerHTML = "";
            output.innerHTML = "";
            input = "";    
        }
        else if (value == "="){
            let result = eval(prepareInput(input));
            output.innerHTML = result;
        }
        else{
            if(validateInput(value)){
                input += value;
                inputDisplay.innerHTML = CleanInput(input);
            }
  
        }
    })   
}
function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span style="color:aqua;">x</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span style="color:aqua;">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span style="color:aqua;">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span style="color:aqua;">-</span> `;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span style="color:aqua;">%</span>`;
		}
	}

	return input_array.join("");
}
function validateInput(value){
    let lastElement = input.slice(-1);
    let operators = ["+", "-", "%", "*","/"];
    if((value == "." && lastElement == ".")  || (value == "." && operators.includes(lastElement)) || (value =="." && lastElement =="")) {
        return false;
    }
    if(operators.includes(value)){
        if(operators.includes(lastElement)){
            return false;
        }
        else if(lastElement ==""){
            return false;
        }
        else{
            return true;
        }
    }
    return true;
}

function prepareInput(input){
    let inputArray = input.split("");
    for(let i=0; i<inputArray.length; i++){
         if(inputArray[i] == "%"){
            inputArray[i] = "/100";
        }
    }
    return inputArray.join("");
}

