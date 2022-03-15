const {browser_code} = require('roll-right')

console.log(process.cwd())
let files = browser_code()

for ( let fcontent of files ) {
    console.log(fcontent)
}
