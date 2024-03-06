export default interface ProviderInterface {
    echo: (text: string) => string;
    print: (...text: string[]) => void;
    alert(message: string): void;
    greet: (title: string, age: number) => void;
}
