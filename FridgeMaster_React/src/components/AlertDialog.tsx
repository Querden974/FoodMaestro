import {X} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,

} from "@/components/ui/dialog"
import {Button, buttonVariants} from "@/components/ui/button"

import type {VariantProps} from "class-variance-authority";
import type {ReactElement} from "react";



export default function AlertDialog({
                                        variants = "default",
                                        buttonLabel,
                                        title,
                                        description,
                                        component,
                                        setDialogOpen,
                                        isOpen = false,
                                        redirectTo,
                                    }: {
    variants?: VariantProps<typeof buttonVariants>["variant"],
    buttonLabel: string
    title?: string
    description?: string
    component?: ReactElement
    setDialogOpen?: (open: string) => void
    isOpen?: boolean
    redirectTo: string
}) {
    return (
        <>
            <Button
                className={"cursor-pointer"}
                variant={variants}
                onClick={() => setDialogOpen?.(buttonLabel)}
            >
                {buttonLabel}
            </Button>

            <Dialog open={isOpen} onOpenChange={(open) => {
                if (!open) setDialogOpen?.("");
            }}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <div className={"flex justify-between items-center"}>
                            <DialogTitle>{title}</DialogTitle>
                            <DialogClose asChild>
                                <button
                                    type="button"
                                    onClick={() => setDialogOpen?.("")}
                                    className="p-1 rounded hover:bg-gray-100"
                                    aria-label="Fermer"
                                >
                                    <X className={"size-5"} />
                                </button>
                            </DialogClose>
                        </div>
                        <DialogDescription>{description}</DialogDescription>
                        {component}
                    </DialogHeader>

                    <DialogFooter>
                        <div className="mx-auto text-center">
                            <p>{buttonLabel == "Login" ? "You don't have an account?" : "You Already have an account?"}</p>
                            <button
                                className="text-blue-500 font-semibold hover:underline cursor-pointer"
                                onClick={() => setDialogOpen?.(redirectTo)}
                            >
                                {redirectTo === "Register" ? "Create an account" : "Log in to your account"}
                            </button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}