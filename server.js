const express = require('express')
const cors = require('cors');
const {node,cpp,python} = require('compile-run')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({
    origin:'*'
}))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.post('/compile',async (req,res)=>{
    const code = req.body.data
    const language = req.body.language
    var result = ''
    if(language=='javascript'){
      result = await node.runSource(code)
    }
    if(language=='cpp'){
      result = await cpp.runSource(code)
    }
    if(language=='python'){
      result = await python.runSource(code)
    }

    console.log(code, language)
    console.log(result)
    res.json(result)
})

app.listen(4000 || process.env.PORT,()=>{
    console.log('Compiler API server running on port 4000')
})