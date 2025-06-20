import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type {FoodType} from "@/shared/store/useContainerStore.ts";


export default function TableSearchResult({items,setItem}
    :{items:FoodType[],
    setItem: (item:FoodType)=> void
}) {

    return (
        <Table>
            {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-center">Nutri-score</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className={"h-max"}>
                {items && items.map(item => (
                    <TableRow className={"h-12 cursor-pointer"} onClick={() => setItem(item)}>
                        <TableCell>
                            <img src={item.imageUrl}
                                        alt={`${item.productName} - ${item.brand}`}
                                        width={20}
                                        className={"object-fill"}
                        />
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell className={"text-center"}>{item.nutriGrade.toUpperCase()}</TableCell>

                    </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}
