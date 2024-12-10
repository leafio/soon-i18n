export declare const formatString: (str: string, obj: Record<string, any>) => string;
export type AllPaths<T> = T extends {} ? {
    [K in keyof T]-?: K extends string ? T[K] extends string | ((...args: any) => any) ? `${K}` : `${K}.${AllPaths<T[K]> extends string ? AllPaths<T[K]> : never}` : never;
}[keyof T] : never;
export declare const flatTreeKey: (obj: Record<string, any>, curKey?: string, result?: Record<string, any>) => Record<string, any>;
export declare const formatObjKey: (messages: any, id: string, ...obj: any) => any;
export declare const loadLocale: (callback: (locale: any) => void, langLoading: Record<string, any>, lang?: string, localesRaw?: Record<string, any>) => void;
export declare const loadSyncLocales: (rawLocales: Record<string, any> | undefined, targetLocales?: any) => any;
export type GetParamsOfStr<Str> = Str extends `${string}{${infer Key}}${infer Right}` ? `${Key}` | GetParamsOfStr<`${Right}`> : never;
export type OptionParams<Params> = Params extends never ? [obj?: any] : Partial<Params> extends Params ? [obj?: Params] : [obj: Params];
export type GetParamsOfFun<Fun extends (...args: any) => any> = Parameters<Fun>;
export type GetParams<T> = T extends (...args: any) => any ? GetParamsOfFun<T> : OptionParams<{
    [key in GetParamsOfStr<T>]: string | number;
}>;
export type GetValue<data, path> = data extends string ? never : data extends {} ? {
    [K in keyof data]-?: K extends string ? path extends K ? data[K] : path extends `${K}.${infer Right}` ? GetValue<data[K], Right> : never : never;
}[keyof data] : never;
type Expand<T> = T extends infer O ? {
    [K in keyof O]: O[K];
} : never;
type UnionToIntersection<U> = (U extends any ? (a: (k: U) => void) => void : never) extends (a: infer I) => void ? I : never;
type UnionLast<U> = UnionToIntersection<U> extends (a: infer I) => void ? I : never;
type UnionToTuple<U> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, UnionLast<U>>>, UnionLast<U>];
type ObjetNeverKeys<T> = {
    [K in keyof T]: T[K] extends never ? K : never;
}[keyof T];
type OmitNever<T> = Expand<{
    [K in keyof Omit<T, ObjetNeverKeys<T>>]: T[K] extends object ? OmitNever<T[K]> : T[K];
}>;
type CombineNotSameNever<T1, T2> = T1 extends object ? T2 extends object ? {
    [K in keyof T1]: K extends keyof T2 ? CombineNotSameNever<T1[K], T2[K]> : never;
} : never : T2 extends object ? never : T1 extends T2 ? T2 extends T1 ? T1 : never : never;
type PUBLIC<T1, T2> = OmitNever<CombineNotSameNever<T1, T2>>;
type TupleSame<T> = T extends [infer S] ? S : T extends [infer T1, infer T2, ...infer R] ? R extends [] ? PUBLIC<T1, T2> : TupleSame<[PUBLIC<T1, T2>, ...R]> : never;
type UnifiedParamsStr<Str> = Str extends `${string}{${infer Key}}${infer Right}` ? `{${Key}}${UnifiedParamsStr<Right> extends never ? "" : `,${UnifiedParamsStr<Right>}`}` : never;
type TranLocale<T> = Expand<{
    [K in keyof T]: T[K] extends string ? UnifiedParamsStr<T[K]> extends never ? string : UnifiedParamsStr<T[K]> : T[K] extends (...arg: any) => string ? T[K] : T[K] extends object ? TranLocale<T[K]> : never;
}>;
export type GetLocales<T> = T extends Partial<Record<string, infer O>> ? O extends () => Promise<{
    default: infer Locale;
}> ? TranLocale<Locale> : TranLocale<O> : never;
export type SafeLocales<T> = TupleSame<UnionToTuple<GetLocales<T>>>;
export {};
