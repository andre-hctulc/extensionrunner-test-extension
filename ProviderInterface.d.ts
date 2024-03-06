export default interface ProviderInterface {
    echo: (text: string) => string;
    print: (...text: string[]) => void;
    alert(message: string): void;
    greet: (x: string, ds: number) => void;
}
