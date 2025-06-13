import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AllFeaturesArea() {

    const featuresPlaceholder = () => {
        return Array.from({ length: 8 }, (_, i) => (
            <Card className="">
                    <CardHeader>
                        <CardTitle>Feature {i + 1}</CardTitle>
                        <CardDescription>Descritpion</CardDescription> 
                    </CardHeader>
                    <CardContent>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat temporibus eligendi nobis at illum, tempora asperiores in? Perspiciatis eaque minus aperiam libero.</p>                    
                    </CardContent>
                </Card>
        ));
    }

    return (
        <div className={" flex flex-col gap-6 place-items-center justify-center "}>
            <h4 className={"text-6xl"}>This is what <span className={"font-fredoka-one"}>Maestro</span> can do</h4>
            <div className={"grid grid-cols-4 w-8/10 h-112 gap-4"}>

                {featuresPlaceholder()}

                {/* <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>1. Add your food</h5>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>2. Track your food</h5>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>3. Save money</h5>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>3. Save money</h5>
                </div>

                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>1. Add your food</h5>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>2. Track your food</h5>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>3. Save money</h5>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>3. Save money</h5>
                </div> */}
            </div>
        </div>
    )
}
