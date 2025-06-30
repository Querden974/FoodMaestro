import {useState} from "react";

export const Route = createFileRoute({
  component: DefaultDashboard,
})

import {useContainerStore} from "@/shared/store/useContainerStore.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ContainerBoxMini} from "@/components/ContainerBox.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Link} from "@tanstack/react-router";

export default function DefaultDashboard() {
  const { containers } = useContainerStore();
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid w-full h-2/3 gap-4 md:grid-cols-3">
          {containers && containers.map((container, index) => (
              <Card key={index} className={"bg-muted/75"}>
                <CardHeader>
                  <CardTitle>
                      <Link to={`/dashboard/container/$id`} params={{id:container.id.toString()}}>
                          {container.containerName}
                      </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContainerBoxMini items={container.containerFood}/>
                </CardContent>
              </Card>
          ))}



        </div>
        <div className="bg-muted/50 f-full flex-1 rounded-xl md:min-h-min w-full" >
          <div className={"flex bg-muted/75 rounded-xl w-1/2 gap-0"}>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-l-xl border bg-muted/75 mx-0 "
            />
            <Card className={"w-full bg-muted/75 rounded-none rounded-r-xl shadow-none"}>
              <CardHeader>
                <CardTitle>Expires Soon</CardTitle>
                <CardDescription>Pay attention to those foods</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>

            </Card>
          </div>

        </div>
      </div>
  )
}