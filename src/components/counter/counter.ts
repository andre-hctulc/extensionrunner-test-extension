import Adapter from "../../../../Adapter";
import ProviderInterface from "../../ProviderInterface";

export interface Out {
    print: (...text: string[]) => void;
    increment: () => number;
    reset: () => void;
}

export type State = { incr: number };

let counter = 0;

new Adapter<ProviderInterface, Out, State>({
    provider: "http://localhost:1234",
    // DEBUG
    errorOnUnauthorized: true,
    out: {
        // handle via function
        print: function (...text) {
            // this refers to the adapter here
            const container = document.getElementById("print");
            if (container) container.innerHTML = text.join(" ");
        },
        increment: function () {
            return (counter += this.state?.incr || 1);
        },
        reset: () => (counter = 0),
    },
}).start(adapter => {
    // handle via event
    adapter.addEventListener("op:increment", ev => {
        const container = document.getElementById("counter_para");
        // counter gets incremented by operation implemntation
        if (container) container.innerHTML = counter.toString();
    });

    const echoBtn = document.getElementById("echo-btn") as HTMLButtonElement | null;

    if (echoBtn) {
        echoBtn.onclick = async () => {
            const echoContainer = document.getElementById("echo");
            const echoInp = document.getElementById("echo-input") as HTMLInputElement | null;
            if (!echoContainer || !echoInp) return;
            const echo = await adapter.execute("echo", echoInp && echoInp.value ? echoInp.value : "<empty>");
            echoContainer.innerHTML = echo;
        };
    }

    const incr1Btn = document.getElementById("incr1");
    const incr5Btn = document.getElementById("incr5");

    if (incr1Btn)
        incr1Btn.onclick = () => {
            adapter.pushState({ incr: 1 });
        };
    if (incr5Btn)
        incr5Btn.onclick = () => {
            adapter.pushState({ incr: 5 });
        };
});
