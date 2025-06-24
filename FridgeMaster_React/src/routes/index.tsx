import LandingArea from "@/features/Home/component/LandingArea.tsx";
import HowToUseArea from "@/features/Home/component/HowToUseArea.tsx";
import AllFeaturesArea from "@/features/Home/component/AllFeaturesArea.tsx";
import FaqArea from "@/features/Home/component/FaqArea.tsx";
import Footer from "@/features/Home/component/Footer.tsx";
import NavBar from "@/features/Home/component/NavBar.tsx";

import {useInView} from "react-intersection-observer";


import {useRef} from "react";
import {ArrowUp} from "lucide-react";

import {Button} from "@/components/ui/button.tsx";

import {motion, AnimatePresence} from "motion/react";

export const Route = createFileRoute({
    component: Index,    
})


export function Index() {

    const {ref, inView} = useInView({
        threshold: 1,
    })

    const howToRef = useRef<HTMLDivElement | null>(null);
    const featureRef = useRef<HTMLDivElement | null>(null);
    const faqRef = useRef<HTMLDivElement | null>(null);


    return (
        <div className={"relative w-full"}>

            <div ref={ref}>
                <NavBar  />
            </div>

            <div className="place-items-center grid gap-4 font-fredoka px-16 max-w-screen relative">



                <LandingArea />
                        <div className={"grid gap-96"}>

                            <div ref={howToRef} id={"howItWorks"} className={"scroll-mt-32 "}>
                                <HowToUseArea/>
                            </div>

                            <div ref={featureRef} id={"features"} className={"scroll-mt-32 "}>
                                <AllFeaturesArea />
                            </div>

                            <div ref={faqRef} id={"faq"} className={"scroll-mt-32 w-full"}>
                                <FaqArea />
                            </div>

                        </div>
                        <Footer />

            </div>

                <AnimatePresence initial={false}>

                    {!inView && (
                    <motion.div className={`fixed bottom-16 right-16 z-50`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{
                                    duration: 0.3,
                                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5},
                                    ease: "easeInOut" }}



                    >
                        <Button variant={"ghost"} className={`rounded-full border size-12 bg-foreground cursor-pointer text-background hover:text-foreground `} onClick={() => {
                            window.scrollTo({top: 0, behavior: "smooth"})
                        }}>
                            <ArrowUp className={"size-8  "}/>
                        </Button>
                    </motion.div>
                    )}

                </AnimatePresence>


        </div>
    )
}

