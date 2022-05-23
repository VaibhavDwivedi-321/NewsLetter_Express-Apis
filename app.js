const express  = require("express");
const bodyParser = require("body-parser");
const request =  require("request");
const app = express();
const https = require("https");



//using body parser to take the data eneter by the user
app.use(bodyParser.urlencoded({extended: true}));




//how to publi local files and display html on server
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
});


//taking the data
app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email
//creating an object
  var data = {
    members:[
      {
        email_address : email,
        status : "subscribed",
        merge_feilds :{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
//converting above data into json
var jsonData = JSON.stringify(data);
const url = "https://us14.api.mailchimp.com/3.0/lists/035a3cddf2";
const options = {
  method: "POST",
  auth: "vaibhav:505a2bd46f887f34d16bc5f37486f66c-us14"
}


const request = https.request(url,options,function(response){
if(response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}


response.on("data",function(data){
  console.log(JSON.parse(data));
})
});

request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
})









app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000 ");
});







//api key 505a2bd46f887f34d16bc5f37486f66c-us14
//list id 035a3cddf2
