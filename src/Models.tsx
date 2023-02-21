export interface locationArray {
    latitude:Number,
    longitude:Number
}



export interface queryParams {
    mode:string,
    origin:locationArray | undefined,
    destination:locationArray | string,
    avoid:"tolls" | "highways" | "ferries" | "indoors" | undefined,
    language:string,
    traffic_model:string | undefined,
    units:"metric" | "imperial"
}