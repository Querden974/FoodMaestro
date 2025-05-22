export default async function AddFoodSubmit(API:string, form:object ){
    try {
        const res:Response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),

        })
        if(!res.ok){
            throw new Error(`An error occured: ${res.status}`);
        }
        if(res.status === 200){
            console.log("Food added successfully.");

        }


    }catch (err){
        console.error(err);
    }
}