import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type {FoodType} from "@/shared/store/useContainerStore.ts";

export default function ItemDialog({item}: {item:FoodType}) {
    return (
        <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{item.productName + " - " + item.brand}</DialogTitle>

                </DialogHeader>
                <div className="">
                    <p>{item.nutriments}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
