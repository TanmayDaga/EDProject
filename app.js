const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const url = require('url');
const { data, dataSchema } = require('./data/data')
const app = express()
const PORT = 6969
app.use(express.static('./public'))

app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.listen(PORT,'172.31.16.85',
    console.log(`Server started on port ${PORT}`)
)


app.post('/submit',(req,res) => {
    const refererUrl = req.get('referer');
    const userData = req.body
    // Parse the referer URL to extract the pathname
    const pathname = url.parse(refererUrl).pathname;

    // Split the pathname by '/' and get the last parameter
    const id = pathname.split('/').pop();
    data[id] = dataSchema;
    data[id][0].medicineName = userData.medName_1
    data[id][0].medicineDoze = userData.dose_1
    data[id][0].medicineTime = userData.time_1
    data[id][0].medicineDescription = userData.description_1

    data[id][1].medicineName = userData.medName_2
    data[id][1].medicineDoze = userData.dose_2
    data[id][1].medicineTime = userData.time_2
    data[id][1].medicineDescription = userData.description_2

    data[id][2].medicineName = userData.medName_3
    data[id][2].medicineDoze = userData.dose_3
    data[id][2].medicineTime = userData.time_3
    data[id][2].medicineDescription = userData.description_3
    console.log(data);


    res.redirect(refererUrl)
})
// TODO - to add cookie check
app.get('/:id',(req,res)=> {

   const id = req.params.id
   let isLoggedIn = false
   let dataToSend = []

   if(Object.keys(data).includes(id)){
    isLoggedIn = true
    dataToSend = data[id]
   } 
    res.render('./partials/form',{isLoggedIn, data:dataToSend})
})


app.get('/api/:id',(req,res) => {
    const id = req.params.id
    let dataToSend = []
    if(Object.keys(data).includes(id)){
        dataToSend = data[id]
    }
    res.send(dataToSend) 
})


app.all('/',(req,res)=>{
    res.render('./partials/form',{isLoggedIn:false,data:[]})
})