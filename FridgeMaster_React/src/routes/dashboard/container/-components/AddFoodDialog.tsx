import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx"
import {Plus, Search} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator.tsx"
import {useDebounce} from "@/hooks/use-debounce.ts"
import type {FoodType} from "@/shared/store/useContainerStore.ts";
import {SearchItem} from "@/routes/dashboard/container/-services/SearchFoodItems.ts"
import TableSearchResult from "@/routes/dashboard/container/-components/TableSearchResult.tsx";
import AddItemForm from "@/routes/dashboard/container/-components/AddItemForm"

export default function AddFoodDialog({containerId}:{containerId:number}) {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search,500);

    const [open, setOpen] = useState(false)

    const [itemsList, setItemsList] = useState<FoodType[] | null>(null)
    const [selectItem, setSelectedItem] = useState<FoodType | null>(null)


    // useEffect(() => {
    //     console.log(selectItem)
    //
    // }, [selectItem]);


    useEffect(() => {
        const fetch =async () => {
            const res = await SearchItem(debouncedSearch)
            if (res) {
                setItemsList(res)
                console.log(res)
            }
            if(search.length === 0) setItemsList(null)

        }
        fetch()


    }, [debouncedSearch]);
    return (
        <Dialog open={open} onOpenChange={() => {
            setItemsList(null)
            setSelectedItem(null)
            setSearch("")
            setOpen(prev => !prev)
        }}>
            <DialogTrigger asChild>
                <Button variant={"default"} className={"size-auto rounded-full aspect-square cursor-pointer"}
                >
                    <Plus className={"size-6"} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Which food you wand to add to your container?</DialogTitle>
                    <DialogDescription>
                        Please search your desired food.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center h-10 border-2 rounded-xl">
                    <div className="px-2 justify-center">
                        <Search className={"mx-auto"}/>
                    </div>
                    <Separator orientation={"vertical"} className={"data-[orientation=vertical]:w-[2px] data-[orientation=vertical]:h-2/3"} />
                    <input type={"search"}
                           placeholder={"Nutella"}
                           className={"px-2 h-full w-full focus:ring-none focus:outline-none"}
                           value={search} onChange={(e)=> setSearch(e.target.value)}/>
                </div>

                {itemsList && (itemsList?.length > 0 && search)&& !selectItem && <TableSearchResult items={itemsList} setItem={setSelectedItem}/>}
                {selectItem && <AddItemForm item={selectItem} containerId={containerId}/>}
            </DialogContent>
        </Dialog>
    )
}
