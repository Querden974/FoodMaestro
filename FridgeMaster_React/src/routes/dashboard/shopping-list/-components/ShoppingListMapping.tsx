import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {Minus, Save } from 'lucide-react'
import {type ShoppingItemType, useShoppingStore} from "@/shared/store/useShoppingStore.ts";
import {useEffect, useRef, useState} from "react";

export default function ShoppingListMapping() {
    const [selectItemEditing, setSelectItemEditing] = useState<ShoppingItemType | null>(null);
    const editItemRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if(selectItemEditing && editItemRef.current){
            editItemRef.current.value = selectItemEditing.name;
            editItemRef.current.focus();
        }
    }, [selectItemEditing]);

    const shoppingItems = useShoppingStore((state) => state.items);
    const {removeItem, toggleChecked, editItem} = useShoppingStore.getState();

    const handleEdit = (id:number, name:string) => {
        if(editItemRef.current) {
            editItem(id,name)
            setSelectItemEditing(null);
            editItemRef.current.value = "";
        }
    }

    return (
        <div className={" flex flex-col gap-2 w-1/6"}>
            {shoppingItems.map((item) => (
                <div key={item.id} className={"flex items-center gap-2 h-6"}>
                    <Checkbox  checked={item.checked}
                               onCheckedChange={() => toggleChecked(item.id)}/>
                    {selectItemEditing?.id !== item.id
                        ?
                        <>
                            <Label key={item.id}
                                   onDoubleClick={() => setSelectItemEditing(item)}
                                   className={`w-full text-md ${item.checked ? "line-through opacity-75" : ""}`}>
                                {item.name}
                            </Label>

                            <Button variant={"destructive"}
                                    className={"aspect-square size-6 cursor-pointer ml-auto"}
                                    onClick={() => removeItem(item.id)}
                            >
                                <Minus />
                            </Button>
                        </>

                        :
                        <>
                            <Input type={"text"}
                                   className={"h-min"}
                                   onKeyDown={(e) => e.key === "Enter" && editItemRef.current && handleEdit(item.id, editItemRef.current.value)}
                                    ref={editItemRef}


                            />
                            <Button variant={"default"}
                                    className={"aspect-square size-6 cursor-pointer ml-auto"}
                                    onClick={() =>
                                        editItemRef.current && handleEdit(item.id, editItemRef.current.value)
                                    }
                            >
                                <Save />
                            </Button>
                        </>

                    }
                </div>
            ))}
        </div>
    )
}
