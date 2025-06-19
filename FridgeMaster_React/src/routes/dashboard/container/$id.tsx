import {useLoaderData} from "@tanstack/react-router";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ContainerBox} from "@/components/ContainerBox.tsx";
import {useContainerStore} from "@/shared/store/useContainerStore.ts";
import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";
import {Button} from "@/components/ui/button.tsx";
import {Save} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {useState} from "react";

export const Route = createFileRoute({
    component: ContainerShow,
    loader: async ({ params }) => {
        const { id } = params;
        return {id};
    }

})

function ContainerShow() {
    const { id } = useLoaderData({from: "/dashboard/container/$id"});
    const data = useContainerStore((state) => state.containers).filter(c => c.id === parseInt(id))[0];
    const user = useAuthStore((state) => state.username);

    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState<number | null>(null);
    return(
        <div className="p-2 flex-1 flex flex-row gap-4">


            <Card className={"bg-muted/75 w-full"}>
                <CardHeader className={"relative"}>
                    <div className="flex justify-between">
                        <CardTitle>{data.containerName}</CardTitle>
                        <AnimatePresence>
                            {isEditing &&
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className={"absolute right-6"}
                            >
                                <Button className={"size-auto rounded-full aspect-square cursor-pointer"}
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditedItem(null);
                                        }
                                    }
                                >
                                    <Save className={"size-6"} />
                                </Button>
                            </motion.div>
                            }
                        </AnimatePresence>

                    </div>

                </CardHeader>
                <CardContent >
                    <ContainerBox items={data.containerFood} setEditing={setIsEditing} setEditedItem={setEditedItem} editedItem={editedItem} isEditing={isEditing}/>
                </CardContent>
            </Card>



            <Card className={"bg-muted/75 w-1/4 h-fit py-0 pb-5"}>

                <CardContent>
                    <div className="mt-4 grid gap-2 select-none">
                        <h2 className="text-lg font-semibold">Container Details</h2>
                        <div className="">
                            <p>Container ID: {data.id}</p>
                            <p>Container Owner: {user}</p>
                            <p>Created At: {new Date(data.createdAt).toLocaleDateString()}</p>
                            <p>Updated At: {new Date(data.updatedAt).toLocaleDateString()}</p>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}