export const info = (msg: string, ...arg: undefined[]) =>
    console.log("info | ", msg, ...arg);

export const statistics = (msg: any, ...arg: any[]) =>
    console.log("statistics | ", msg, ...arg);

export const stateLog = (msg: any, ...arg: any[]) =>
    console.log("state | ", msg, ...arg);
