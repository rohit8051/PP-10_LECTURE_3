//input->
let fs= require("fs");
//input
let input= process.argv.slice(2);
console.log("input", input);
let options= [];
let filepaths= [];
//to extract options and filepaths from the input
for(let i= 0; i< input.length; i++){
    //first character js string
    if(input[i] =="-s" || input[i]== "-b" || input[i]== "-n"){
        options.push(input[i]);
    }
    else{
        filepaths.push(input[i]);
    }
}
//console.log("options", options);
//console.log("filepaths", filepaths);
//check that all file paths exist
for(let i= 0; i< filepaths.length; i++){
    let isFilePresent= fs.existsSync(filepaths[i]);
    if(isFilePresent == false){
        console.log("filepaths", filepaths[i], "does not exist");
        return;
    }
}
//to read content from file paths
let totalContent= "";
for( let i= 0; i< filepaths.length; i++){
    let contentOFCurrent= fs.readFileSync(filepaths[i]);
    totalContent+= contentOFCurrent+"\r\n";
}
//console.log(totalContent);
//immplements
let isSoption= options.includes("-s");
//to implement -s option->remove empty line breaks
if(isSoption== true){
    let outputArr= totalContent.split("\r\n");
    let tempArr= [];
    for(let i= 0; i< outputArr.length; i++){
        let isElementValid= outputArr[i] !=="";
        if(isElementValid){
            tempArr.push(outputArr[i]);
        }
    }
    outputArr = tempArr;
    totalContent= tempArr.join("\r\n");
}
//console.log(totalContent);
//put a number to every line
let isN= options.includes("-n");
let isB= options.includes("-b");
let finalOption;
if(isN == true){
    if(isB== true){

        //the options that comes first-> that would be the final
        let idxN= options.indexOf("-n");
        let idxB= options.indexOf("-b");
        finalOption= idxB < idxN ? "-b" : "-n";

    }
    else{
        finalOption= "-n";
    }
}
else if(isB == true){
    finalOption= "-b";
}

if(finalOption== "-n"){
    let count= 1;
    let contentArr= totalContent.split("\r\n");
    for(let i= 0; i< contentArr.length; i++){
        contentArr[i]= count+". "+ contentArr[i];
        count++;
    }
    totalContent= contentArr.join("\n\r")
}
//console.log(totalContent);

if(finalOption== "-b"){
    let count= 1;
    let contentArr= totalContent.split("\r\n");
    //console.log(contentArr);
    for(let i= 0; i<contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i]= count + ". "+ contentArr[i]
            count++;
        }
    }
    totalContent= contentArr.join("\r\n");
    //console.log(contentArr);
}

console.log(totalContent);