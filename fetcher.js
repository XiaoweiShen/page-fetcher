
const fs = require('fs');
const request = require('request');
const fileArgs = process.argv.slice(2); 
const urlAddress = fileArgs[0];
const localFile= fileArgs[1];
const readline = require("readline");
const ans = {'Y':true,'y':true}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const body1 = request(urlAddress, (error, response, body) => {
  
  if (error){
    console.log('error:', error); // Print the error if one occurred
    return ;
   }
   
   if (response.statusCode <200 || response.statusCode >299){
    console.log("download error, please check url or retry");
    return; 
   }
   else
   {
    console.log('statusCode:', response && response.statusCode); 
    fs.access(localFile,err=>{
     if(!err)
     {
       rl.question("File alreay exist, do you want overwrite?(Y/N)",(answer) =>{
         if(ans[answer]){
           return fs.writeFile(localFile,body,(err)=>{
             if (err) throw err;
             fs.stat(localFile,(err,stats)=>{
               console.log(`Downloaded and saved ${stats.size} bytes to ${localFile}`);
             rl.close();
             });
           });  
         }
       rl.close();
     })
    }else{
       return fs.writeFile(localFile,body,(err)=>{
         if (err) throw err;
         fs.stat(localFile,(err,stats)=>{
           console.log(`Downloaded and saved ${stats.size} bytes to ${localFile}`);
         });
       });
     }
   })
  }

});