const fs = require ('fs');
const os = require ('os');

console.log(os.cpus().length);



//Sync..
// fs.writeFileSync('./test.txt' , "I m Sync");
// //Async
// fs.writeFile('./test1.txt', "I m Async", (err)=> {console.log(err);
// } )