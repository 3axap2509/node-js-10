const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var jsonRes;
var jsonPath = "./films.json";

function fread(){}; // get
function fcreate(){}; // post
function fupdate(){}; // post
function fdelete(){}; // post

app.post("/films/create", (req, res)=>
{
    let b = req.body;
    if(b.title && b.rating && b.budget && b.year && b.gross && b.poster && b.position)
    {
        let id = Math.round(Math.random()*1000000000000);
        while(jsonRes.find(film=>
            {
                film.id == id;
            }))
            {
                id = Math.round(Math.random()*1000000000000);
            }
        b.id = id;
        let pos = Number.parseInt(b.position);
        let pp = 0;
        jsonRes.forEach(element =>
        {
            element.position > pp? pp = Number.parseInt(element.position):pp = pp;
        });
        if(pos > pp)
        {
            b.position = pp+1;
        }
        else
        {
            jsonRes.forEach(element => {Number.parseInt(element.position) >= pos?element.position = Number.parseInt(element.position) + 1:{}})
        }
        jsonRes.push(b);
        res.send(`added element: 
    ${JSON.stringify(b)}`);
    changeFilms();
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


app.post("/films/delete", (req, res)=>
{
    let id = Number.parseInt(req.body.id);
    let ind;
    let bufItem;
    let pos;
    jsonRes.forEach((element, index) => {
        if(Number.parseInt(element.id) == id)
        {
            ind = index;
            bufItem = element;
            pos = element.position;
        }
    });
    if(ind)
    {
        jsonRes.splice(ind, 1);
        jsonRes.forEach(element => {
            if(element.position > pos)
                element.position -= 1;
        });
        res.send(`deleted item: ${JSON.stringify(bufItem)}`);
        changeFilms();
    }
    else
        res.send(`can't find film with id №${id}`);
})


app.post("/films/update", (req, res)=>
{
    let body = req.body
    if(!body.year && !body.budget && !body.title)
    {
        let id = body.id;
        let b;
        let ind;
        if(ind = jsonRes.find(film => film.id == id))
        {
            b = true;
        }
        else
            b = false;
        if(b)
        {
            let bufb;
            if(body.position)
                ind.position = body.position;
            if(body.rating)
                ind.rating = body.rating;
            if(body.poster)
                ind.poster = body.poster
            if(body.gross)
            {
                if(body.gross > 0)
                    ind.gross = body.gross;
            }
            jsonRes.forEach(element => {
                if(element.id == id)
                {
                    bufb = element;
                    element = ind;
                }
            });
            res.send(`changed item: from ${JSON.stringify(bufb)} to ${JSON.stringify(ind)}`);
        }
        else
        {
            res.send(`can't find film with id №${id}`);
        }
    }
    else
    {
        res.send(`Allowed only to change id, position, gross and poster. Another changes are forbidden `);
    }
})


app.post("/films/read", (req, res)=>
{
   res.send(jsonRes.find(film=>film.id == req.body.id)?jsonRes.find(film=>film.id == req.body.id):`can't find film with id ${req.body.id}`);
})

function changeFilms()
{
    fs.writeFileSync(jsonPath, JSON.stringify(jsonRes));
}

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
    let jsonBuf = fs.readFileSync("./films.json");
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