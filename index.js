const express = require('express');
const mongoose = require('mongoose');
const redis= require('redis');

const app = express();


//configure environment variables
const PORT=process.env.PORT
const REDIS_PORT='6379'
const REDIS_HOST='redis'
const DB_PORT='27017'
const DB_username='root'
const DB_password='password'
const DB_HOST='mongo'

//configure redis 
const RedisURI=`redis://${REDIS_HOST}:${REDIS_PORT}`
const RedisClient= redis.createClient({
    url: RedisURI
  });
RedisClient.on('connect', () => console.log('Redis Client is runing ... '));
RedisClient.on('error', err => console.log('Redis Client Error', err.message));
RedisClient.connect();

//configure mongoDB
const MongoURI= `mongodb://${DB_username}:${DB_password}@${DB_HOST}:${DB_PORT}`
mongoose.connect(MongoURI)
.then(()=> console.log('mongodb is running correctly'))
.catch((err)=> console.log('mongodb is not running:'+err.message))

//configure App
const dataArray = ['book1', 'book2', 'book3'];
const jsonString = JSON.stringify(dataArray);

app.get('/',(req, res)=>{
    RedisClient.set('my-data',jsonString)
    res.send(`<h1>Welcome in my ${process.env.ENV} </h1>`)})

app.get('/mydata',async (req, res)=>{
    let data=await RedisClient.get('my-data')
    res.send(`<h1>Welcome in my ${process.env.ENV} </h1> ${data}`)})    
    
app.listen(PORT,()=>{console.log('listening on port '+PORT);});