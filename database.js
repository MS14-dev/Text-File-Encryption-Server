var sql=require('mysql');

var connection=sql.createConnection({
    database:'imgEncryp',
    password:'',
    host:'localhost',
    user:'root',
    port:3306
})

connection.connect((err)=>{
    if(err) throw err
    else{
        console.log(`Successfully cnnected`)
    }
})

// try{
//   var message=await connection.connect()
//   console.log(message)
// }
// catch(err){
// console.log(err);
// }

module.exports=connection;