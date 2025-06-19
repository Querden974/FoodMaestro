import {
    Table,
    TableBody, TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type {ContainerFoodType, FoodType} from "@/shared/store/useContainerStore.ts";
import {Label} from "@/components/ui/label.tsx";

import {Input} from "@/components/ui/input.tsx";

import {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/use-debounce.ts"

import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";

export function ContainerBox({items, setEditing, setEditedItem, editedItem, isEditing}
                                     :{
    items?: ContainerFoodType[],
    setEditing: (editing: boolean) => void,
    setEditedItem: (index: number | null) => void,
    editedItem?: number | null
    isEditing?: boolean
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<FoodType | null>(null)
    const [clics, setClics] = useState<number>(0)
    const debounceClics = useDebounce(clics, 150)

    let timer:NodeJS.Timeout;

    useEffect(() => {
        if(debounceClics === 1) setIsOpen(true)

        console.log(clics)
    }, [debounceClics]);

    return (
        <Table className={"w-full"}>
            <TableHeader className={""}>
                <TableRow className={""}>
                    <TableHead className="w-3/10">Name</TableHead>
                    <TableHead className={"w-1/10"}>Brand</TableHead>
                    <TableHead className={"w-1/10"}>Quantity</TableHead>
                    <TableHead className={"w-1/10"}>Unit</TableHead>
                    <TableHead className="text-center w-2/10">Expire</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { items && items.map((item, index) => (
                    <>

                        <TableRow key={index}
                                  onDoubleClick={() => {
                                      setEditedItem(index)
                                      setEditing(true);
                                  }}
                                  onClick={() => {
                                        setSelectedItem(item.foodFactItem)
                                      timer= setTimeout(()=>{
                                          setClics(0)
                                      },500)
                                      setClics(prev => prev +1)
                                  }}
                        >




                            <TableCell className="font-medium">
                                <Label>{item.foodFactItem.productName}</Label>

                            </TableCell>
                            <TableCell>
                                <Label>{item.foodFactItem.brand}</Label>

                            </TableCell>
                            <TableCell>
                                {isEditing && editedItem === index
                                    ? <Input value={item.quantity}/>
                                    : <Label>{item.quantity}</Label>
                                }
                            </TableCell>
                            <TableCell>
                                {isEditing && editedItem === index
                                    ? <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder={item.unit} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L">L : Liters</SelectItem>
                                            <SelectItem value="G">G : Grams</SelectItem>
                                            <SelectItem value="U">U : Unity</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    : <Label>{item.unit}</Label>
                                }

                            </TableCell>
                            <TableCell className="text-center">
                                {isEditing && editedItem === index
                                    ? <Input value={item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : "N/A"}/>
                                    : <Label>{item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : "N/A"}</Label>
                                }

                            </TableCell>
                        </TableRow>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent  className={""}>
                                <DialogHeader>
                                    <DialogTitle>{selectedItem?.productName + " - " + selectedItem?.brand}</DialogTitle>

                                </DialogHeader>
                                <div className="">
                                    <p>{selectedItem?.nutriments}</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>


                ))}
            </TableBody>
            { items && items.length === 0 && (
                <TableCaption>No food items in this container</TableCaption>
            )}
        </Table>
    )
}

export function ContainerBoxMini({items}:{items:ContainerFoodType[]}) {

    return (
        <Table className={"w-full"}>
            <TableHeader className={""}>
                <TableRow className={""}>
                    <TableHead className="w-3/10">Name</TableHead>
                    <TableHead className={"w-1/10"}>Brand</TableHead>
                    <TableHead className={"w-1/10"}>Quantity</TableHead>
                    <TableHead className={"w-1/10"}>Unit</TableHead>
                    <TableHead className="text-center w-2/10">Expire</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { items && items.map((item, index) => (
                    <TableRow key={index} >
                        <TableCell className="font-medium">
                            <Label>{item.foodFactItem.productName}</Label>

                        </TableCell>
                        <TableCell>
                            <Label>{item.foodFactItem.brand}</Label>

                        </TableCell>
                        <TableCell>
                            <Label>{item.quantity}</Label>
                        </TableCell>
                        <TableCell>
                            <Label>{item.unit}</Label>


                        </TableCell>
                        <TableCell className="text-center">
                            <Label>{item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : "N/A"}</Label>


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
