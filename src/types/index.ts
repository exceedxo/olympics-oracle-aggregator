export interface Price {
    id: string;
    symbol: string;
    price: number | undefined;
    expo: number | undefined;
}

export interface diaResponse {
    Symbol: string;
    Name: string;
    Address: string;
    Blockchain: string;
    Price: number;
    PriceYesterday: number;
    VolumeYesterdayUSD: number;
    Time: string;
    Source: string;
}