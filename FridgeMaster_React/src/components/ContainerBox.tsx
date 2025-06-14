
import {
    Table,
    TableBody, TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type {ContainerFoodType} from "@/shared/store/useContainerStore.ts";

export default function ContainerBox({items}:{items?: ContainerFoodType[]}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-center">Expire</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { items && items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{item.foodFactItem.productName}</TableCell>
                        <TableCell>{item.foodFactItem.brand}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell className="text-center">
                            {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : "N/A"}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            { items && items.length === 0 && (
                <TableCaption>No food items in this container</TableCaption>
            )}
        </Table>
    )
}
