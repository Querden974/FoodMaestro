import {useForm} from "@tanstack/react-form"
import {Label} from "@/components/ui/label.tsx"
import {Input} from "@/components/ui/input.tsx"

import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import type {FoodType} from "@/shared/store/useContainerStore.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {AddItemToContainer} from "@/routes/dashboard/container/-services/AddItemToContainer.ts";


export default function AddItemForm({item, containerId}:{item:FoodType, containerId:number}) {
    const form = useForm({
        defaultValues:{
            quantity: 1,
            unit: ""
        },
        onSubmit: async ( {value}) => {
            await AddItemToContainer(containerId,item.id,value)

        }
    })
    return (

        <>
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

                        <TableRow className={"h-12 cursor-pointer"}>
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


                </TableBody>
            </Table>


            <form className={"grid grid-cols-2 gap-2"} onSubmit={async (e)=> {
                if(form.state.errorMap) e.preventDefault()
                await form.handleSubmit()
            }}>


                <form.Field name="quantity">
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={field.name}>Quantity:</Label>
                            <Input type={"number"}
                                   id={"field.name"}
                                   min={1}
                                   value={field.state.value}
                                   onChange={(e) => field.handleChange(Number(e.target.value))}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">

                                    {field.state.meta.errors.map((error) =>
                                        JSON.stringify(error).replace(/"/g, "")
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field name="unit">
                    {(field) => (
                        <div className="grid gap-1">
                            <Label htmlFor={field.name}>Unit:</Label>
                            <Select value={field.state.value} onValueChange={field.handleChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">L : Liters</SelectItem>
                                    <SelectItem value="G">G : Grams</SelectItem>
                                    <SelectItem value="U">U : Unity</SelectItem>
                                </SelectContent>
                            </Select>
                            {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.map((error) =>
                                        JSON.stringify(error).replace(/"/g, "")
                                    ).join(", ")}
                                </p>
                            )}
                        </div>
                    )}
                </form.Field>


                <Button type={"submit"} className={"cursor-pointer mt-2 col-span-2 w-full"}>
                    Add to container
                </Button>
            </form>
        </>

    )
}
