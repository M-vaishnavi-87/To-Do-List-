const express = require('express')
const cors = require('cors');
const app = express();
const mysql = require('mysql2')
app.use(cors());

app.use(express.json())

const db =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password@123',
    database:'todo'
})

db.connect((err)=>{
    if(err){
        console.log("error connecting to the database")
        return
    }
    console.log("Connected to the database")
})
app.get('/', (req, res) => {
    console.log("default route");
    db.query('select * from todoItems',(err,result)=>{
        if(err){
            console.log("Error occured",err)
            return res.status(500).send("Database Error")
        }
        console.log("Data: ",result)
        res.json(result)
    });
});

app.post('/add-item', (req, res) => {
    console.log(req.body);
 
    db.query(`insert into todoItems(itemDescription) values('${req.body.text}')`,(err,res)=>{
        if(err){
            console.log("Error occured",err)
            return
        }
        console.log("created successfully!")
    })
       res.send("added successfully!")
})

app.put('/edit-item',(req,res)=>{
    console.log("line 49: ",req.body)
    db.query(`update todoItems set itemDescription = "${req.body.itemDescription}" where Id = "${req.body.id}"` ,(err,res)=>{
        if(err){
            console.log("Error occured",err)
            return
        }
        console.log("Success!")
    })
       
})
app.delete('/delete-item/:id',(req, res)=>{
    const itemId = parseInt(req.params.id,10);
    console.log(`Attempting to delete item with Id: ${itemId}`);
    db.query(`Delete from todoItems where id = ${itemId}`,(err,result)=>{
        if(err){
            console.error("Error occured while deleting: ",err);
            return res.status(500).send("Database Error during deletion");
        }
        console.log("Deleted Successfully!")
        res.sendStatus(200);
    })
})
app.listen(3000, (err) => {
    console.log("server started running on port 3000")
})