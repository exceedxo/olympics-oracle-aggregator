import { usePriceStore } from "@/stores";
import { Tabs, Tab } from "@nextui-org/react";
import AverageTable from "@/components/AverageTable";
import PythTable from "@/components/PythTable";
import ChainlinkTable from "@/components/ChainlinkTable";
import DiaTable from "@/components/DiaTable";
import { useSettingsStore } from "@/stores";

function Home() {

    const { isInitialized } = usePriceStore();
    const { isDarkMode } = useSettingsStore(); 

    return (
        <div className={`${isDarkMode ? "bg-primary text-primary" : "bg-light text-light"} min-h-[calc(100vh-12rem)] flex justify-center`}>
            <div className="w-full max-w-screen-2xl flex flex-col px-8 py-16">
                <div className="flex flex-col items-center w-full h-full">
                    <div className="flex flex-col justify-center items-center gap-4 my-16 text-center px-8">
                        <h1 className="lg:text-4xl text-3xl font-bold">Olympics Oracle Aggregator</h1>
                        <p className="lg:text-xl text-lg">
                            This is a simple application that aggregates price feeds from different oracles and displays the latest price updates.
                        </p>
                    </div>
                
                    {isInitialized() ?  (
                        <div className="lg:w-[36rem] lg:h-[36rem] w-full h-full">
                            <Tabs fullWidth={true}>
                                <Tab key="Average" title="Average">
                                    <AverageTable />
                                </Tab>
                                <Tab key="Pyth" title="Pyth">
                                    <PythTable />
                                </Tab>
                                <Tab key="Chainlink" title="Chainlink">
                                    <ChainlinkTable />
                                </Tab>
                                <Tab key="DIA" title="DIA">
                                    <DiaTable />
                                </Tab>
                            </Tabs>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-36 text-center">
                            <h2 className="text-2xl font-bold">Loading...</h2>
                            <h2 className="text-2xl font-bold">Might take a while for all oracles to load.</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
