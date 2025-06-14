import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HowToUseArea() {
    return (
        <div className={" flex flex-col gap-6 place-items-center justify-center "}>
        <h4 className={"text-6xl"}> <span className={"font-fredoka-one"}>Simple</span> to use</h4>
            <div className={"grid grid-cols-3 w-8/10 h-84 gap-4"}>

                <Card className="bg-foreground/50">
                    <CardHeader>
                        <CardTitle>1. Add your food</CardTitle>
                        <CardDescription>Add your food to the app with the expiry date.</CardDescription> 
                    </CardHeader>
                    <CardContent>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat temporibus eligendi nobis at illum, tempora asperiores in? Perspiciatis eaque minus aperiam libero.</p>                    
                    </CardContent>
                </Card>

                <Card className="bg-foreground/50">
                    <CardHeader>
                        <CardTitle>2. Track your food</CardTitle>
                        <CardDescription>Track your food and see when it expires.</CardDescription> 
                    </CardHeader>
                    <CardContent>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat temporibus eligendi nobis at illum, tempora asperiores in? Perspiciatis eaque minus aperiam libero.</p>                    
                    </CardContent>
                </Card>

                <Card className="bg-foreground/50">
                    <CardHeader>
                        <CardTitle>3. Save money</CardTitle>
                        <CardDescription>Save money by not wasting food.</CardDescription> 
                    </CardHeader>
                    <CardContent>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat temporibus eligendi nobis at illum, tempora asperiores in? Perspiciatis eaque minus aperiam libero.</p>                    
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}
