var args = process.argv;
console.log(args);

var arrayOfNumbers = [args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11]];

console.log("your numbers: " + arrayOfNumbers);

var nulls = 0;
var positiveNumbers = 0;
var negativeNumbers = 0;
var evenNumbers = 0;
var oddNumbers = 0;

for (i=0; i<10; i++){
    
    if(arrayOfNumbers[i] == 0){
        nulls++;
    } else if(arrayOfNumbers[i] > 0) {
        positiveNumbers++;
        if(arrayOfNumbers[i]%2 == 0){
            evenNumbers++;
        } else {
            oddNumbers++;
        }
    } else {
        negativeNumbers++;   
        if(arrayOfNumbers[i]%2 == 0){
            evenNumbers++;
        } else {
            oddNumbers++;
        }
    }
}
console.log("number of nulls is: " + nulls + ", " + "number of positive is: " + positiveNumbers + ", " + "number of negative is: " + negativeNumbers + ", " + "number of even numbers is: " + evenNumbers + ", " + "number of odd numbers is: " + oddNumbers);


