import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { usePriceStore } from "@/stores";

function PythTable() {
    
    const { pythPrices } = usePriceStore();

    const columns = [
        { key: "count", label: "#" },
        { key: "symbol", label: "Symbol" },
        { key: "price", label: "Price" },
    ]

    const rows = [
        { count: 1, symbol: "BTC/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[0].price ?? 0) },
        { count: 2, symbol: "ETH/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[1].price ?? 0) },
        { count: 3, symbol: "BNB/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[2].price ?? 0) },
        { count: 4, symbol: "SOL/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[3].price ?? 0) },
        { count: 5, symbol: "LINK/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[4].price ?? 0) },
        { count: 6, symbol: "AVAX/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[5].price ?? 0) },
        { count: 7, symbol: "OP/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[6].price ?? 0) },
        { count: 8, symbol: "MATIC/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[7].price ?? 0) },
        { count: 9, symbol: "USDT/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[8].price ?? 0) },
        { count: 10, symbol: "USDC/USD", price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(pythPrices[9].price ?? 0) },
    ]

    return (
        <Table
            aria-label="Pyth Prices"
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

export default PythTable;
