import {useTitlePageStore} from "@/shared/store/useTitlePageStore.ts";

export function setTitleRoute(title:string){
    const setTitle = useTitlePageStore.getState().setTitle;
    setTitle(title);


}