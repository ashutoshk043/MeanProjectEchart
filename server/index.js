const express = require('express')
const app = express()
const port = 8081
const xlsx = require('xlsx')

const cors = require('cors')


app.use(cors())



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/get-server-data',async(req, res)=>{

  try {


    const excelWorkBook = await xlsx.readFile(__dirname+'/sampletest.xlsx')

    const sheetName = excelWorkBook.SheetNames[0]

    const rawData = excelWorkBook.Sheets[sheetName]

    const jsonData = xlsx.utils.sheet_to_json(rawData)



      res.send({status:true, data:jsonData})
  } catch (error) {
      res.send({status:false, error:error.message})
  }

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
