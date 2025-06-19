import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type FeatureType = {
    title: string;
    description?: string;
    content: string;
}

const features:FeatureType[] = [
    {
        title: "Feature 1",
        description: "Description for feature 1",
        content: "Content feature"
    },
    {
        title: "Feature 2",
        description: "Description for feature 2",
        content: "Content feature"
    },
    {
        title: "Feature 3",
        description: "Description for feature 3",
        content: "Content feature"
    },
    {
        title: "Feature 4",
        description: "Description for feature 4",
        content: "Content feature"
    },
    {
        title: "Feature 5",
        description: "Description for feature 5",
        content: "Content feature"
    },
    {
        title: "Feature 6",
        description: "Description for feature 6",
        content: "Content feature"
    },
]

export default function AllFeaturesArea() {

    const featureContent = () => {
        return features.map((feature, index) => (
            <Card className="bg-foreground/50" key={index}>
                <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className={"text-accent"}>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{feature.content}</p>
                </CardContent>
            </Card>
        ));
    }

    return (
        <div className={" flex flex-col gap-6 place-items-center justify-center "}>
            <h4 className={"text-6xl"}>This is what <span className={"font-fredoka-one"}>Maestro</span> can do</h4>
            <div className={"grid grid-cols-4 w-8/10 h-112 gap-4"}>

                {featureContent()}


            </div>
        </div>
    )
}
