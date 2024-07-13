import { HermesClient } from "@pythnetwork/hermes-client";
import Wallet from "@coral-xyz/anchor/dist/cjs/nodewallet"
import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import { OCR2Feed } from "@chainlink/solana-sdk"
import { pythPriceFeeds, chainlinkPriceFeeds } from "@/priceFeeds";
import { diaResponse } from "@/types";
import { Price } from "@/types";

const solanaConnection = new Connection(import.meta.env.VITE_SOLANA_RPC_URL);;

const pythConnection = new HermesClient("https://hermes.pyth.network", {});

export const getPythPrices = async () => {
    const fetchPrices = await pythConnection.getLatestPriceUpdates(pythPriceFeeds.map((priceFeed) => priceFeed.id));
    return fetchPrices;
}

const anchorWallet = new Wallet(Keypair.generate());

const anchorProvider = new anchor.AnchorProvider(solanaConnection, anchorWallet, anchor.AnchorProvider.defaultOptions());

const CHAINLINK_PROGRAM_ID = new anchor.web3.PublicKey("cjg3oHmg9uuPsP8D6g29NWvhySJkdYdAo9D25PRbKXJ");

export const chainlinkFeedAddresses = chainlinkPriceFeeds.map((priceFeed) => new anchor.web3.PublicKey(priceFeed.id));

export const chainlinkDataFeed = await OCR2Feed.load(CHAINLINK_PROGRAM_ID, anchorProvider);

export async function fetchDIAPrices(): Promise<diaResponse[]> {
    const btcResponse = await fetch("https://api.diadata.org/v1/quotation/BTC");
    const ethResponse = await fetch("https://api.diadata.org/v1/quotation/ETH");
    const bnbResponse = await fetch("https://api.diadata.org/v1/quotation/BNB");
    const solResponse = await fetch("https://api.diadata.org/v1/quotation/SOL");
    const linkResponse = await fetch("https://api.diadata.org/v1/quotation/LINK");
    const avaxResponse = await fetch("https://api.diadata.org/v1/quotation/AVAX");
    const opResponse = await fetch("https://api.diadata.org/v1/quotation/OP");
    const maticResponse = await fetch("https://api.diadata.org/v1/quotation/MATIC");
    const usdtResponse = await fetch("https://api.diadata.org/v1/quotation/USDT");
    const usdcResponse = await fetch("https://api.diadata.org/v1/quotation/USDC");
    const btcData: diaResponse = await btcResponse.json();
    const ethData: diaResponse = await ethResponse.json();
    const bnbData: diaResponse = await bnbResponse.json();
    const solData: diaResponse = await solResponse.json();
    const linkData: diaResponse = await linkResponse.json();
    const avaxData: diaResponse = await avaxResponse.json();
    const opData: diaResponse = await opResponse.json();
    const maticData: diaResponse = await maticResponse.json();
    const usdtData: diaResponse = await usdtResponse.json();
    const usdcData: diaResponse = await usdcResponse.json();
    const data = [btcData, ethData, bnbData, solData, linkData, avaxData, opData, maticData, usdtData, usdcData];
    return data;
}

export const aggregatePrices = (pythPrices: Price[], chainlinkPrices: Price[], diaPrices: Price[]) => {
    const pythPricesMap = pythPrices.map((price) => price.price);
    const chainlinkPricesMap = chainlinkPrices.map((price) => price.price);
    const diaPricesMap = diaPrices.map((price) => price.price);
    
    let aggregatedPrices: Price[] = [
        { id: "BTC", symbol: "BTC/USD", price: undefined, expo: undefined },
        { id: "ETH", symbol: "ETH/USD", price: undefined, expo: undefined },
        { id: "BNB", symbol: "BNB/USD", price: undefined, expo: undefined },
        { id: "SOL", symbol: "SOL/USD", price: undefined, expo: undefined },
        { id: "LINK", symbol: "LINK/USD", price: undefined, expo: undefined },
        { id: "AVAX", symbol: "AVAX/USD", price: undefined, expo: undefined },
        { id: "OP", symbol: "OP/USD", price: undefined, expo: undefined },
        { id: "MATIC", symbol: "MATIC/USD", price: undefined, expo: undefined },
        { id: "USDT", symbol: "USDT/USD", price: undefined, expo: undefined },
        { id: "USDC", symbol: "USDC/USD", price: undefined, expo: undefined }
    ]

    for (let i = 0; i < 10; i++) {
        const pythPrice = pythPricesMap[i];
        const chainlinkPrice = chainlinkPricesMap[i];
        const diaPrice = diaPricesMap[i];
        if (pythPrice === undefined || chainlinkPrice === undefined || diaPrice === undefined) continue;
        const averagePrice = (pythPrice + chainlinkPrice + diaPrice) / 3;
        aggregatedPrices[i].price = averagePrice;
    }

    return aggregatedPrices;
}

