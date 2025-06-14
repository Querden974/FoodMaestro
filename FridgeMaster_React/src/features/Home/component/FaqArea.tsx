import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqArea() {

    const faqPlaceholder = () => {
        return Array.from({ length: 10 }, (_, i) => (
            <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className={"cursor-pointer text-3xl hover:bg-foreground/25 px-4"}>Question {i + 1}</AccordionTrigger>
                <AccordionContent className="text-xl">
                        lorem45 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        lorem45 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </AccordionContent>
            </AccordionItem>
        ));
    }

    return (
        <div className="w-8/10 mx-auto">
            <h4 className={"text-6xl text-center mb-8"}>
                Frequently Asked <span className={"font-fredoka-one"}>Questions</span></h4>

            <Accordion
                type="multiple"
                className="full"
                defaultValue={[]}
            >
                {faqPlaceholder()}
            </Accordion>


        </div>
    )
}
