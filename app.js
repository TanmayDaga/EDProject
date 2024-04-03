const express = require('express')
const path = require('path')
const app = express()
const PORT = 6969
app.use(express.static('./public'))

app.listen(PORT,'172.31.16.85',
    console.log(`Server started on port ${PORT}`)
)

app.get('/',(req,res)=>{
    console.log(req);
    res.sendFile(path.join(__dirname,'/public/actual_page.html'))

})


app.get('/api/:id',(req,res)=> {
    res.send(JSON.stringify([
        {
            compartmentNumber:1,
            medicineName:'fds',
            medicineDoze:'lj',
            medicineTime:'12:32:22',
            medicineDescription:'sdfafasz',
        },
        {
            compartmentNumber:2,
            medicineName:'sfdafsda',
            medicineDoze:'fdsafdsakjlhj',
            medicineTime:'10:12:32',
            medicineDescription:'fdsafadsfsad',
        },
        {
            compartmentNumber:3,
            medicineName:'jlljhloiuio',
            medicineDoze:'jlksjfdalkjslj',
            medicineTime:'10:18:15',
            medicineDescription:'fsdakjfsdalkfjkalsjflksjalj',
        }
    ]))
})