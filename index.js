const day = 7
const run = require(`./${day}/index.js`) 

function main() {
    try {
        let result = 
            // run(`./inputs/${day}/day${day}_easy.txt`);
         run(`./inputs/${day}/day${day}.txt`)
        
        console.log(result)
    } catch (e) {
        console.log("--- failed to load module ---")
        console.error(e)
    }
}

main()