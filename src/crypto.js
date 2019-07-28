const fs = require("fs");

module.exports = processFile;

function processFile(password){
    let forUser = {};

    const buffer = fs.readFileSync("src/keys.json");
    const json = buffer.toString();
    const obj = JSON.parse(json);

    forUser.number = generateInitialPassword(password);
    forUser.groups = shuffleKeys(obj.groups);

    return forUser;
}


// algorithm for password
function generateInitialPassword(password){
    if(password.length < 6){
        throw new Error("Password must be longer than 6!")
    }

    const chars = password.split("");
    let product = 1;
    chars.forEach((item) => {
        let ascii = item.charCodeAt(0);
        product *= ascii;
    });
    const c = 2**34; 
    return ( product % c );
}


function shuffleKeys(groups){

    groups.forEach((obj) => {
        shuffle(obj["keys"]);
    });

    return groups;    
}

function shuffle(array){
    let currIn = array.length, randomIndex;

    while(0 !== currIn){
        randomIndex = Math.floor(Math.random() * currIn);
        currIn -= 1;

        [array[currIn], array[randomIndex]] = [array[randomIndex], array[currIn]];
    }
    return array;
}

