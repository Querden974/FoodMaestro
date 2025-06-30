import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Minus, Pencil, Plus, Save} from "lucide-react"

import {Label} from "@/components/ui/label.tsx";

import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/input.tsx";

import {useShoppingStore} from "@/shared/store/useShoppingStore.ts";

export const Route = createFileRoute({
  component: RouteComponent,
})

type ShoppingItemType = {
    id: number;
    name: string;
    checked: boolean;

}

function RouteComponent() {
    const [newItem, setNewItem] = useState<string>("");
    const [selectItemEditing, setSelectItemEditing] = useState<ShoppingItemType | null>(null);

    const {addItem, removeItem, toggleChecked, editItem} = useShoppingStore.getState();
    const shoppingItems = useShoppingStore((state) => state.items);


    const handleAdd = () => {
        addItem(newItem)
        setNewItem("");
    }


  return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Card>
              <CardHeader>
                  <CardTitle>Shopping List</CardTitle>
                  <CardDescription>This is a shopping list for your items.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex flex-col gap-4">

                      <div className="flex gap-1 items-center w-full">
                          <Label className={"flex gap-2 items-center h-max w-1/5  py-2 px-4 rounded-full border focus-within:outline-1 cursor-text"}>
                              <Pencil className={"size-6"} />
                              <input className={"h-full w-full focus:outline-none"} type={"text"} value={newItem}
                                     onChange={(e) => setNewItem(e.target.value)}
                                     onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                                     placeholder={"Add item to shopping list"} />

                          </Label>
                          <Button className={"rounded-full aspect-square h-full cursor-pointer"}
                                  onClick={() => handleAdd()}
                          >
                              <Plus />
                          </Button>
                      </div>

                      <div className={" flex flex-col gap-2 w-1/6"}>
                          {shoppingItems.map((item) => (
                              <div key={item.id} className={"flex items-center gap-2 h-6"}>
                                  <Checkbox  checked={item.checked}
                                             onCheckedChange={() => toggleChecked(item.id)}/>
                                  {selectItemEditing?.id !== item.id
                                      ?
                                      <>
                                          <Label key={item.id}
                                                 onDoubleClick={() => {
                                                     setSelectItemEditing(item)
                                                 }}
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
                                          <Input value={item.name}
                                                 className={"h-min"}
                                                 onKeyDown={(e) => e.key === "Enter" && setSelectItemEditing(null)}
                                                 onChange={(e) => editItem(item.id, e.target.value)}


                                          />
                                          <Button variant={"default"}
                                                  className={"aspect-square size-6 cursor-pointer ml-auto"}
                                                  onClick={() => {
                                                      setSelectItemEditing(null)
                                                  }}
                                          >
                                              <Save />
                                          </Button>
                                      </>

                                  }
                              </div>
                          ))}
                      </div>
                  </div>
              </CardContent>
          </Card>


      </div>
  )
}
