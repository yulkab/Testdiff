const outputEl = document.getElementById('output');

document.getElementById('datesForm').addEventListener('submit',function(evt){
        evt.preventDefault();
        setOutput(this.elements.dates.value);       
})

var setOutput = function setOutputTextInHtml(dateStr){
    outputEl.innerText = justDoIt(dateStr); 
}

var justDoIt = function calcDatesDifference(dateStr){

    let outputTxt = ' ';
    let datesArr = dateStr.split(",").map( d => { return  d.trim(); });

    // Get array of the dates in ISO format
    let isoDatesArr = datesArr.map( d => {  return  d.split(" ").reverse().join('-');  });

    try	{
        //tricky way to validate that date is correct - not necesserely neat
        isoDatesArr.forEach( idate => {

            let d = new Date(); 
                d.setTime (Date.parse( idate ));

            let newDStr = `${d.getFullYear()}-${pad(d.getMonth()+1,2)}-${pad(d.getDate(),2)}`;

                if( newDStr !== idate )  throw err;
        });

        //calculating the days diff by computing epoch time difference
        let diff =  Date.parse( isoDatesArr[0] ) - Date.parse( isoDatesArr[1] );
            if ( isNaN(diff) ) return outputTxt = `${datesArr[0]} , ${datesArr[1]} , null`;

            if(diff > 0) datesArr.reverse();

            diff = Math.abs( diff ) / 86400000;

            outputTxt = `${datesArr[0]} , ${datesArr[1]} , ${diff}`;

	} catch (err) { 
         outputTxt = `${datesArr[0]} , ${datesArr[1]} , null`; 
	}
    return outputTxt;
} 
var pad = function addPaddingToDate(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// Tests
var test = function runTests(el){

    let testOutput = '';

    let test1 = () => {
        let res = justDoIt('02 01 1817, 01 01 1817');
        testOutput += `<p>Test 1 - testing basic days diff plus order remains : <br> ${res} - ${( res == '01 01 1817 , 02 01 1817 , 1') ? 'ok' : 'err'} </p>`  ;
    };
    
    let test2 = () => {
        let res = justDoIt('01 01 1997, 01 01 1997');
        testOutput += `<p> Test 2 - testing basic equal dates : <br> ${res} - ${( res == '01 01 1997 , 01 01 1997 , 0') ? 'ok' : 'err'} </p>`  ;
    };
    
    let test3 = () => {
        let res = justDoIt('31 04 1817, 21 01 1817');
        testOutput += `<p> Test 3 - testing that invalid date is handled: <br> ${res} - ${( res == '31 04 1817 , 21 01 1817 , null') ? 'ok' : 'err'} </p>`  ;
    };
    let test4 = () => {
        let res = justDoIt('15 07 2317, 29 11 1013');
        testOutput += `<p> Test 4 - testing reording of the dates plus range: <br> ${res} - ${( res == '29 11 1013 , 15 07 2317 , 476139') ? 'ok' : 'err'} </p>`  ;
    };
    let test5 = () => {
        let res = justDoIt('01 13 1997, 01 13 1997');
        testOutput += `<p> Test 5 - testing extreme dates : <br> ${res} - ${( res == '01 13 1997 , 01 13 1997 , null') ? 'ok' : 'err'} </p>`  ;
    };
    
    test1();   
    test2();
    test3();
    test4();
    test5();

    el.nextElementSibling.innerHTML = testOutput;
}

