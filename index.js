const express = require('express');
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize  = new Sequelize( process.env.DATABASE_URL,{

    dialect:'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const SensorData = sequelize.define('sensor-data' ,{

name: {
    type: DataTypes.STRING,
    allowNull: false
},
serial: {
    type: DataTypes.STRING,
    allowNull: false
},
temperature: {
    type: DataTypes.FLOAT,
    allowNull: false
}
});

app.use(express.json());

const dataList = [];

app.get('/data' , async (req,res) => {
    const allData = await SensorData.findAll();

res.status(200).send(allData);
return;

});

app.post('/data' , async (req,res) => {
    let data = req.body;
    const sensorData = SensorData.create(data);
    //dataList.push(data)
    res.status(201).send(data);
    return;
    
    });
app.listen({ port: 3000 } ,()=> {

    try {
 sequelize.authenticate();
 
 console.log('Connected to Database');
sequelize.sync({ alter: true });
console.log('Sync to datbase');

    }
    catch(error){
        console.log('cant connet to datbase',error);
    };

    console.log('server is running');
}
)