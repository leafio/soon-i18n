export declare const formatString: (str: string, obj: Record<string, any>) => string;
export type AllPaths<T> = T extends {} ? {
    [K in keyof T]-?: K extends string ? T[K] extends string | ((...args: any) => any) ? `${K}` : `${K}.${AllPaths<T[K]> extends string ? AllPaths<T[K]> : never}` : never;
}[keyof T] : never;
export declare const flatTreeKey: (obj: Record<string, any>, curKey?: string, result?: Record<string, any>) => Record<string, any>;
export declare const formatObjKey: (messages: any, id: string, ...obj: any) => any;
export declare const loadLocale: (callback: (locale: any) => void, langLoading: Record<string, any>, lang?: string, localesRaw?: Record<string, any>) => void;
export declare const loadSyncLocales: (rawLocales: any, targetLocales?: any) => any;
export type GetParamsOfStr<Str> = Str extends `${string}{${infer Key}}${infer Right}` ? `${Key}` | GetParamsOfStr<`${Right}`> : never;
export type OptionParams<Params> = Params extends never ? [obj?: any] : Partial<Params> extends Params ? [obj?: Params] : [obj: Params];
export type GetParamsOfFun<Fun extends (...args: any) => any> = Parameters<Fun>;
export type GetParams<T> = T extends (...args: any) => any ? GetParamsOfFun<T> : OptionParams<{
    [key in GetParamsOfStr<T>]: string | number;
}>;
export type GetValue<data, path> = data extends string ? never : data extends {} ? {
    [K in keyof data]-?: K extends string ? path extends K ? data[K] : path extends `${K}.${infer Right}` ? GetValue<data[K], Right> : never : never;
}[keyof data] : never;
