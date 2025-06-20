import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Plus, Search} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Separator} from "@/components/ui/separator"

export default function AddFoodDialog() {
    const [search, setSearch] = useState<string>("")
    return (
        <Dialog>
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

            </DialogContent>
        </Dialog>
    )
}
