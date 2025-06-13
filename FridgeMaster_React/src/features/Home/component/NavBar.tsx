import {Button} from "@/components/ui/button.tsx";

export default function NavBar() {

    return (
        <nav>
            <div className="p-2 flex gap-2">
                <Button variant="ghost" className="font-bold" >
                    Home
                </Button>
                <Button asChild>
                    <a href={"#howItWorks"} className="font-bold" >
                        How it works
                    </a>
                </Button>
                <Button asChild>
                    <a href={"#features"} className="font-bold" >
                        Features
                    </a>
                </Button>
                <Button asChild>
                    <a href={"#faq"} className="font-bold" >
                        Faq
                    </a>
                </Button>
            </div>
        </nav>
    )
}
