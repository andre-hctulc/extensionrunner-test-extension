import Adapter from "../../../Adapter";
import ProviderInterface from "../ProviderInterface";

function add(a, b) {
    if (!Number.isInteger(a)) a = 0;
    if (!Number.isInteger(b)) b = 0;
    return a + b;
}

function substract(a, b) {
    if (!Number.isInteger(a)) a = 0;
    if (!Number.isInteger(b)) b = 0;
    return a - b;
}

export interface Out {
    add: typeof add;
    substract: typeof substract;
    logArea: (width: number) => void;
}

new Adapter<ProviderInterface, Out>({
    provider: "",
    // DEBUG
    errorOnUnauthorized: true,
    out: { add, substract },
}).start(adapter => {
    adapter.execute("alert", "Math Adapter started");

    adapter.addEventListener("op:logArea", ev => {
        const [width] = ev.payload.args;
        const area = Math.PI * width * width;
        console.log("Area of circle with width", width, ":", area);
    });
});
