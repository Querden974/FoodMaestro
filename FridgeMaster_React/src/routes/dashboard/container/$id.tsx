import {useLoaderData} from "@tanstack/react-router";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ContainerBox} from "@/components/ContainerBox.tsx";
import {type Container, useContainerStore} from "@/shared/store/useContainerStore.ts";
import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";
import {Button} from "@/components/ui/button.tsx";
import {Save, Pencil, RefreshCw} from "lucide-react";
import {motion, AnimatePresence} from "motion/react";
import {useEffect, useState} from "react";
import { Label } from "@/components/ui/label";
import {Input} from "@/components/ui/input.tsx";
import {EditContainerName} from "@/routes/dashboard/container/-services/EditContainerName"
import {FetchUserContainer} from "@/routes/dashboard/container/-services/FetchUserContainer.ts";
import AddFoodDialog from "@/routes/dashboard/container/-components/AddFoodDialog.tsx";

export const Route = createFileRoute({
    component: ContainerShow,
    loader: async ({ params }) => {
        const { id } = params;
        return {id};
    }

})

function ContainerShow() {
    const { id } = useLoaderData({from: "/dashboard/container/$id"});
    const user = useAuthStore((state) => state.username);
    const userId = useAuthStore((s) => s.id)
    const flushContainers = useContainerStore(s => s.clearContainers)
    const fetchContainers = useContainerStore(s => s.fetchContainers)


    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState<number | null>(null);
    const [titleEditing, setTitleEditing] = useState<boolean>(false)

    const containerInfo = useContainerStore( s=> s.containers.find(c => c.id === parseInt(id)))
    const changeContainerName = useContainerStore(s => s.changeContainerName)
    const [oldName, setOldName] = useState(containerInfo?.containerName)

    const handleSubmit = async ()=> {
        if(containerInfo?.containerName !== oldName) {
            if (containerInfo) await EditContainerName({...containerInfo, containerName:containerInfo.containerName.trim()});
            setOldName(containerInfo?.containerName.trim())
        }
        setTitleEditing(prevState => !prevState)
    }

    return(
        <div className="p-2 flex-1 flex flex-row gap-4">


            <Card className={"bg-muted/75 w-full"}>
                <CardHeader className={"relative"}>
                    <div className="flex justify-between">
                        <CardTitle className={"flex gap-3 place-items-center w-1/2 h-8"}>
                            {titleEditing
                                ? <>
                                    <Input className={"text-xl "} value={containerInfo?.containerName}
                                           onKeyDown={async (e)=> {
                                               if(e.key == "Enter") await handleSubmit()
                                           } }
                                           onChange={(e) => {
                                               changeContainerName(e.target.value)

                                    }}/>
                                    <div className={"p-2 cursor-pointer rounded-full hover:bg-foreground/25 transition duration-100"}
                                         onClick={async () => handleSubmit()}

                                    >
                                        <Save className={"size-4"}/>
                                    </div>
                                </>
                                : <>
                                    <Label className={"text-xl"}>{containerInfo?.containerName}</Label>
                                    <div className={"p-2 cursor-pointer rounded-full hover:bg-foreground/25 transition duration-100"}
                                         onClick={() => {
                                             setTitleEditing(prevState => !prevState)
                                         }}
                                    >
                                        <Pencil className={"size-4"}/>
                                    </div>
                                </>
                            }


                        </CardTitle>
                        <AnimatePresence>
                            {isEditing ?
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
                                : <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    className={"absolute flex right-6 gap-2"}
                                >
                                    <AddFoodDialog containerId={Number(id)} />
                                    <Button variant={"secondary"} className={"size-auto rounded-full aspect-square cursor-pointer"}
                                            onClick={async () => {
                                                const data = await FetchUserContainer(userId)
                                                flushContainers()
                                                if(data) fetchContainers(data)
                                            }}
                                    >
                                        <RefreshCw className={"size-6"} />
                                    </Button>
                                </motion.div>
                            }
                        </AnimatePresence>

                    </div>

                </CardHeader>
                <CardContent >
                    <ContainerBox items={containerInfo.containerFood} setEditing={setIsEditing} setEditedItem={setEditedItem} editedItem={editedItem} isEditing={isEditing}/>
                </CardContent>
            </Card>



            <Card className={"bg-muted/75 w-1/4 h-fit py-0 pb-5"}>

                <CardContent>
                    <div className="mt-4 grid gap-2 select-none">
                        <h2 className="text-lg font-semibold">Container Details</h2>
                        <div className="">
                            <p>Container ID: {containerInfo.id}</p>
                            <p>Container Owner: {user}</p>
                            <p>Created At: {new Date(containerInfo.createdAt).toLocaleDateString()}</p>
                            <p>Updated At: {new Date(containerInfo.updatedAt).toLocaleDateString()}</p>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}