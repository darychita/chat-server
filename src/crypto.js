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


// Server side
// Исполнять только при регистрации нового пользователя.
// 1) Генетратор первичного пароля
// ASCII-коды всех букв пароль юзаера перемножаются между собой делятся с остатком на 2**34 который и является первичным номером.
// Пройтись по паролю получая аски коды и перемножая их между собой. Затем разделить с остатком на 2**34 - это и есть первичный пароль. ++++
//  Полученный пароль записать в файл json. 
// Convert character to ASCII code in JavaScript:(https://stackoverflow.com/questions/94037/convert-character-to-ascii-code-in-javascript)

// 2) Рандомная перестановка ключей +++
// В каждом из 26 блоков рандомно переставить ключи местами и записать в json. 
// Тут без особых коментариев)

// 3) Передать файл обратно апке)