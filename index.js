const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonRes;

function fread(){}; // get
function fcreate(){}; // post
function fupdate(){}; // post
function fdelete(){}; // post

app.post("/films/create", (req, res)=>
{
    let b = req.body;
    if(b.title && b.rating && b.budget && b.yearr && b.gross && b.poster && b.position)
    {
        let id = Integer.parse(Date.now.toString());

    }
    else
    {
        res.send(`Missed some parameters.
Check your request for having all the parameters:
    title,
    rating,
    year,
    budget,
    gross,
    poster,
    position`);
    }
})

app.post("/films/read", (req, res)=>
{
   console.log(req.body.id);
   
   res.send(jsonRes.find(film=>film.id == req.body.id)?jsonRes.find(film=>film.id == req.body.id):`can't find film with id ${req.body.id}`);
})


app.get('/films/readall',(req, res)=>
{
    sortFilms(jsonRes);
    result = jsonRes;
    res.send(result);
})

app.get('/', (req, res) =>
{
    res.send("Здарова");
    
});

app.listen(3000, () =>
{
    var jsonBuf = fs.readFileSync("./films.json");
    jsonRes = JSON.parse(jsonBuf);
    console.log("Start listening...");
})

function sortFilms(arr)
{
//   switch(sf)
//     {
//       case "author":
//       {
//         arr.sort((a, b)=>
//         {
//           return orf?a.author.localeCompare(b.author): -a.author.localeCompare(b.author);
//         })
//         break;
//       }
//       case "date":
//       {
//         arr.sort((a, b)=>
//         {
//           return Date.parse(a.date) >= Date.parse(b.date)? (orf?1:-1):(orf?-1:1);
//         })
//         break;
//       }
//       case "id":
//       {
        arr.sort((a, b)=>
        {
          return Number.parseInt(a.position) >= Number.parseInt(b.position)? 1:-1;
        })
    //     break;
    //   }
    //   default:
    //   {
    //     break;
    //   }
    // }
}