function performStatistics(){

let input    = (document.getElementById("text-area").value + "").trim();
let strArray = input.split(' ');
let array    = strArray.map(Number);

if(input.match("  ")){ 
    alert("Values must be separated by exactly one space");
    return false;  
}
if(array.length > 20){
    alert("To many numbers");
    return false;
}
if(array.length < 5){
    alert("To little numbers");
    return false;
}

let mean     = calcMean(array);
let median   = calcMedian(array);
let mode     = calcMode(array);
let stdDev   = calcStdDev(array);
let sum      = calcSum(array);
let variance = calcVariance(array);
let max      = findMax(array);
let min      = findMin(array);

if(max > 100){
    alert("Values cannot be bigger than 100");
    return false;
}
if(min < 0){
    alert("Values cannot be negative");
    return false;
}
if(isNaN(sum)){
    alert("Input values must be numbers");
    return false;
}

document.getElementById("min").value      = parseFloat(min).toFixed(2);
document.getElementById("max").value      = parseFloat(max).toFixed(2);
document.getElementById("sum").value      = parseFloat(sum).toFixed(2);
document.getElementById("mean").value     = parseFloat(mean).toFixed(2);
document.getElementById("median").value   = parseFloat(median).toFixed(2);
document.getElementById("mode").value     = mode;
document.getElementById("variance").value = parseFloat(variance).toFixed(2);
document.getElementById("std-dev").value  = parseFloat(stdDev).toFixed(2);

return false;
}
function calcMean(array){
    let result = calcSum(array);
    result /= array.length;
    return result;
}
function calcMedian(array){
    let temp;
    let len = array.length;
    for (let i = 0; i < len-1; i++){
        for(let j = 0; j < len - 1; j++){
            if(array[j] > array[j+1]){
                temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                continue;
            }         
        }
    }
    if(len%2)
        return array[Math.floor(len/2)];
    else
        return (array[len/2] + array[(len/2)-1])/2;
}
function calcMode(array){
    let size = 0;
    let temp = 0;
    let len = array.length;
    let result = "";
    for (let i = 0; i < len; i++) {
        if(array[i] === array[i+1]) {
            temp++;
            continue;
        }
        if(temp > size){
            result = array[i] + " ";
            size = temp;
        } else if(temp === size){
            result += array[i] + " ";
        }
        temp = 0;
    }
    return result;
}
function calcStdDev(array){
    return Math.sqrt(calcVariance(array));
}
function calcSum(array){
    let result = 0;
    let len = array.length;
    for (let i = 0; i < len; i++)
        result += array[i];    
    return result;
}
function calcVariance(array){
    let mean = calcMean(array);
    let len = array.length;
    let result = 0;
    for(let i = 0; i < len; i++){
        result += Math.pow((array[i]-mean), 2);
    }    
    return result/len;
    
}
function findMax(array){
    let result = 0;
    let len = array.length;
    for (let i = 0; i < len; i++){
        if(array[i] > result) 
        result = array[i];   
    }
        return result;
}
function findMin(array){
    let result = 100;
    let len = array.length;
    for (let i = 0; i < len; i++){
        if(array[i] < result) 
        result = array[i];   
    }
        return result;
}