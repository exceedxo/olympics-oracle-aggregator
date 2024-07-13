import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { aggregatePrices } from "@/data";
import { usePriceStore } from "@/stores";

function AverageTable() {

    const { pythPrices, chainlinkPrices, diaPrices } = usePriceStore();

    const columns = [
        { key: "count", label: "#" },
        { key: "symbol", label: "Symbol" },
        { key: "price", label: "Price" },
    ]

    const aggregatedPrices = aggregatePrices(pythPrices, chainlinkPrices, diaPrices);

    const rows = [
        { count: 1, symbol: "BTC/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[0].price ?? 0) },
        { count: 2, symbol: "ETH/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[1].price ?? 0) },
        { count: 3, symbol: "BNB/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[2].price ?? 0) },
        { count: 4, symbol: "SOL/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[3].price ?? 0) },
        { count: 5, symbol: "LINK/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[4].price ?? 0) },
        { count: 6, symbol: "AVAX/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[5].price ?? 0) },
        { count: 7, symbol: "OP/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[6].price ?? 0) },
        { count: 8, symbol: "MATIC/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[7].price ?? 0) },
        { count: 9, symbol: "USDT/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[8].price ?? 0) },
        { count: 10, symbol: "USDC/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(aggregatedPrices[9].price ?? 0) },
    ]

    return (
        <Table
            aria-label="Average Prices"
            shadow="lg"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={rows}>
                {(row) => (
                    <TableRow key={row.count}>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>{row.symbol}</TableCell>
                        <TableCell>{row.price}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default AverageTable;