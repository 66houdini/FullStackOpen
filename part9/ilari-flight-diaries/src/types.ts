// export type Weather  = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";
export enum Weather{
    Sunny = "sunny",
    Rainy = "rainy",
    Cloudy = "cloudy",
    Stormy = "stormy",
    Windy  = "windy",
}

// export type Visiblity = "great" | "good" | "ok" | "poor";
export enum Visiblity {
Great = "great",
Good = "good",
Ok = "ok",
Poor = "poor",    
}


export interface DiaryEntry {
    id: number;
    date:string;
    weather: Weather;
    visibility: Visiblity;
    comment?:string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
export type NewDiaryEntry = Omit<DiaryEntry, "id">;



// const nonse = (): Omit<DiaryEntry, "comment">[] => {}
// const getNonSensitiveEntries =
//   (): Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>[] => {
//     // ...
//   }
