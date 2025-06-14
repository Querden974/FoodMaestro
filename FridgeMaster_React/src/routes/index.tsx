import LandingArea from "@/features/Home/component/LandingArea.tsx";
import HowToUseArea from "@/features/Home/component/HowToUseArea.tsx";
import AllFeaturesArea from "@/features/Home/component/AllFeaturesArea.tsx";
import FaqArea from "@/features/Home/component/FaqArea.tsx";
import Footer from "@/features/Home/component/Footer.tsx";
import NavBar from "@/features/Home/component/NavBar.tsx";

import { useRouter } from "@tanstack/react-router";
import {useRef, useEffect} from "react";

import {useAuthStore} from "@/features/Login/store/useAuthStore.ts";
import { useNavigate } from "@tanstack/react-router";

import { showToast } from "@/components/ToastInfo";


export const Route = createFileRoute({
    component: Index,    
})


export function Index() {

    const navigate = useNavigate();
    const isLoggedIn = useAuthStore.getState().isLoggedIn
    const {message, icon} = useRouter().state.location.state;

    useEffect(() => {
        if(message && icon) showToast(message, icon);
    }, [message]);


    // useEffect(()=>{
    //     if(isLoggedIn) navigate({
    //         to:"/dashboard",
    //         replace:true
    //     }) 
    // },[])

    const howToRef = useRef<HTMLDivElement | null>(null);
    const featureRef = useRef<HTMLDivElement | null>(null);
    const faqRef = useRef<HTMLDivElement | null>(null);



    return (
        <>
            <NavBar  />

            <div className="place-items-center grid gap-4 font-fredoka px-16 max-w-screen">

                
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
        </>

    )
}

