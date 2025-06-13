import {SiFacebook, SiX,SiGithub} from "@icons-pack/react-simple-icons";
import {Copyright} from "lucide-react";

export default function Footer() {
    return (
        <footer className={"min-h-64 w-full place-items-center grid "}>
            <div className={"grid grid-flow-col gap w-1/4 justify-between"}>
                <SiFacebook />
                <SiX />
                <SiGithub />
            </div>
            <p className={"inline-flex items-center gap-3"}>Food Maestro <span><Copyright className={"size-4"} /></span> {new Date().getFullYear()} </p>
        </footer>
    )
}
