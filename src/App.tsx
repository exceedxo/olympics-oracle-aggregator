import Home from "@/components/Home";
import Header from "@/components/Header";
import { useEffect } from "react";
import { getPythPrices, chainlinkDataFeed, chainlinkFeedAddresses } from "@/data";
import { usePriceStore } from "@/stores";
import { fetchDIAPrices } from "@/data";
import { useSettingsStore } from "@/stores";
import Footer from "@/components/Footer";

function App() {

    const updatePythPrices = usePriceStore((state) => state.updatePythPrices);
    const updateChainlinkPrices = usePriceStore((state) => state.updateChainlinkPrices);
    const updateDiaPrices = usePriceStore((state) => state.updateDiaPrices);

    const { isDarkMode } = useSettingsStore();

    async function updatePythData() {
        const pythPrices = await getPythPrices();
        const preparedPythPrices = pythPrices.parsed?.map((price) => ({ id: "0x" + price.id, price: Number(price.price.price) * 10 ** price.price.expo, expo: price.price.expo }));
        if (preparedPythPrices) {
            updatePythPrices(preparedPythPrices);
        } else {
            console.log("No Pyth data found or could not parse.");
        }
    }

    async function updateDiaData() {
        const diaData = await fetchDIAPrices();
        if (diaData) {
            updateDiaPrices(diaData.map((data) => ({ id: data.Symbol, price: data.Price })));
        } else {
            console.log("No DIA data found or could not parse.");
        }
    }

    useEffect(() => {
        let listeners = chainlinkFeedAddresses.map((feedAddress) => {
            return chainlinkDataFeed.onRound(feedAddress, (round) => {
                updateChainlinkPrices([{ id: feedAddress.toString(), price: Number(round.answer) / 10 ** 8, expo: 8 }]);
            });
        });

        updatePythData();
        updateDiaData();

        const priceFetcher = setInterval(() =>{
            updatePythData();
            updateDiaData();
        }, 60000);

        return () => {
            listeners.map((listener) => chainlinkDataFeed.removeListener(listener));
            clearInterval(priceFetcher);
        }
    }, []);

    return (
        <main className={`${isDarkMode ? "dark" : "light"}`}>
            <Header />
            <Home />
            <Footer />
        </main>
    );
}

export default App;
