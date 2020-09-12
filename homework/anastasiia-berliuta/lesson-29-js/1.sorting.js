
function bubbleSort(array){
    var n = array.length;
    for (let i = 0; i <= array.length; i++) {
        console.log( "ppp= " + i);
        for (let j = 0; j <= n - 1 - i; j++) {
            console.log( "j= " + j);
            if (array[j + 1] < array[j]) {
                console.log("arr1=  " + array);
                var m = array[j + 1];
                console.log("m1111=  " + m);
                array[j + 1] = array[j];
                array[j] = m;
                console.log("m2=  " + m);
                
            }
        }       
    }
    return array;
}
 var myarrayNew = [9, 5, 8, 3];
 var result = bubbleSort(myarrayNew);
 
