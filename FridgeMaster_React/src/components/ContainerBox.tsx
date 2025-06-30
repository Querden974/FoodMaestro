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
import {Button} from "@/components/ui/button.tsx";
import {Trash2, Pencil} from "lucide-react";
import {useContainerStore} from "@/shared/store/useContainerStore.ts"

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

    const removeContainerFood = useContainerStore(s => s.removeContainer)



    useEffect(() => {

        if(debounceClics === 1) setIsOpen(true)
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
                    <TableHead>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { items && items.map((item, index) => (


                        <TableRow key={index}
                                  className={"h-12"}
                                  onDoubleClick={() => {
                                      setEditedItem(index)
                                      setEditing(true);
                                  }}
                        >




                            <TableCell className="font-medium hover:underline" onClick={() => {

                                setSelectedItem(item.foodFactItem)
                                setTimeout(()=>{
                                    setClics(0)
                                },500)
                                setClics(prev => prev +1)
                            }}>
                                <Label className={"cursor-pointer"}>{item.foodFactItem.productName}</Label>

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
                            <TableCell >
                                <div className="flex gap-2 w-fit mx-auto">
                                    <Button variant={"outline"} className={"cursor-pointer"}>
                                        <Pencil/>
                                    </Button>
                                    <Button className={"cursor-pointer"} variant={'destructive'} onClick={() => removeContainerFood(item)}>
                                        <Trash2/>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>





                ))}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent aria-describedby={undefined} className={""}>
                        <DialogHeader>
                            <DialogTitle>{selectedItem?.productName + " - " + selectedItem?.brand}</DialogTitle>

                        </DialogHeader>
                        <img src={`https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${selectedItem?.nutriGrade}-new-fr.svg`}
                             alt={"nutrigrade"}
                             draggable={false}
                             className={"aspect-video h-16 "}
                        />

                        <div className="flex">
                            <img src={selectedItem?.imageUrl} alt={selectedItem?.productName + " - " + selectedItem?.brand + "image"} draggable={false}/>

                            <img src={selectedItem?.nutritionImgUrl} alt={selectedItem?.productName + " - " + selectedItem?.brand + "nutriments"} draggable={false}/>
                        </div>
                    </DialogContent>
                </Dialog>
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

                    </TableRow>
                ))}
            </TableBody>
            { items && items.length === 0 && (
                <TableCaption>No food items in this container</TableCaption>
            )}
        </Table>
    )
}
