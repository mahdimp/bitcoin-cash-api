import { BitcoinCashService } from './services/BitcoinCashService'
import express, { Express, Request, Response } from 'express'
import 'dotenv/config'

const app: Express = express()
app.use(express.json())
const port = process.env.PORT || 3000
const bitcoinCashService = new BitcoinCashService()

app.get('/wallet/balance/:address', async function (req: Request, res: Response) {
  try {
    const { address } = req.params
    const balance = await bitcoinCashService.getBalance(address)
    return res.json({
      balance
    })
  }
  catch (e) {
    res.json({
      error: e
    })
  }
})

app.listen(port, () => {
  console.log("Server is running at port : ", port)
})