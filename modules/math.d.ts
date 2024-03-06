declare function add(a: any, b: any): any;
declare function substract(a: any, b: any): number;
export interface Out {
    add: typeof add;
    substract: typeof substract;
    logArea: (width: number) => void;
}
export {};
