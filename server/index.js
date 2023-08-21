import express  from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration ,OpenAIApi} from 'openai'

const app=express()
env.config()
app.use(cors())
app.use (bodyParser.json())

const configuration=new Configuration({
    organization:"org-2OzCpt6vZHHqn72Hwk0K1gFl",
    apiKey: process.env.API_KEY
})
const openai=new OpenAIApi(configuration)

app.listen("3002",()=> console.log("listen on port 3002"))
app.get("/",(req,res)=>{
    res.send("Helloworld")
})
 app.post('/',async(req, res )=>{
    const {message}=req.body
    try{
        const response =await openai.createCompletion({
            model:"text-davinci-003",
            prompt:`${message}`,
            max_tokens:200,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})
        
    }
    catch(e){
        console.log(e)
        res.send(e).status(400)

    }

 })