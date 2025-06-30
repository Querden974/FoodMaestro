import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import { Pencil, Plus} from "lucide-react"

import {Label} from "@/components/ui/label.tsx";

import {useRef} from "react";
import {Button} from "@/components/ui/button.tsx";

import ShoppingListMapping from "@/routes/dashboard/shopping-list/-components/ShoppingListMapping.tsx";

import {useShoppingStore} from "@/shared/store/useShoppingStore.ts";


export const Route = createFileRoute({
  component: RouteComponent,
    loader: async () => {
        const title = "Shopping List";
        return { title};
    }
})

function RouteComponent() {
    // const [newItem, setNewItem] = useState<string>("");
    const mainInputRef = useRef<HTMLInputElement | null>(null);
    const {addItem} = useShoppingStore.getState();




    const handleAdd = () => {
        if(mainInputRef.current){
            addItem(mainInputRef.current.value)
            mainInputRef.current.value = "";
        }

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
                              <input className={"h-full w-full focus:outline-none"} type={"text"}

                                     onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                                     placeholder={"Add item to shopping list"}
                                     ref={mainInputRef}
                              />

                          </Label>
                          <Button className={"rounded-full aspect-square h-full cursor-pointer"}
                                  onClick={() => handleAdd()}
                          >
                              <Plus />
                          </Button>
                      </div>

                        <ShoppingListMapping />

                  </div>
              </CardContent>
          </Card>


      </div>
  )
}
