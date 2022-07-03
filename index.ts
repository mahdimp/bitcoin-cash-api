import { BitcoinCashService } from "./services/BitcoinCashService";
import express, { Express, Request, Response } from "express";
import "dotenv/config";
const { default: axios } = require("axios");

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const bitcoinCashService = new BitcoinCashService();

app.get(
  "/wallet/balance/:address",
  async function (req: Request, res: Response) {
    try {
      const { address } = req.params;
      const balance = await bitcoinCashService.getBalance(address, false);
      return res.json({
        balance,
      });
    } catch (e) {
      res.json({
        error: e,
      });
    }
  }
);

interface Transaction {
  amount?: string;
  to: string;
  from: string;
  secret: string;
}

app.post("/transaction", async (req: Request<Transaction>, res) => {
  try {
    const { amount, secret, from, to } = req.body;
    let result;

    result = await bitcoinCashService.sendTransaction({
      to,
      from,
      secret,
      amount,
    });

    res.json({
      ...result,
    });
  } catch (error) {
    const err = error as Error;
    res.json({
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server is running at port : ", port);
});
