export interface locationObj {
    latitude:number ,
    longitude:number 
 
}



export interface queryParams {
    mode:string,
    origin:locationObj | undefined,
    destination:locationObj | undefined,
    avoid:"tolls" | "highways" | "ferries" | "indoors" | undefined,
    language:string,
    traffic_model:string | undefined,
    units:"metric" | "imperial"
}