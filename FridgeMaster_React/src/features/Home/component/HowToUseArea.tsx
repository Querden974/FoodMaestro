
export default function HowToUseArea() {
    return (
        <div className={" flex flex-col gap-6 place-items-center justify-center "}>
        <h4 className={"text-6xl"}> <span className={"font-fredoka-one"}>Simple</span> to use</h4>
            <div className={"grid grid-cols-3 h-84 gap-4"}>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>1. Add your food</h5>
                    <p className={"text-gray-600"}>Add your food to the app with the expiry date.</p>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>2. Track your food</h5>
                    <p className={"text-gray-600"}>Track your food and see when it expires.</p>
                </div>
                <div className={"flex flex-col gap-2 bg-slate-300 p-4 rounded-xl"}>
                    <h5 className={"text-2xl"}>3. Save money</h5>
                    <p className={"text-gray-600"}>Save money by not wasting food.</p>
                </div>
            </div>
        </div>
    )
}
