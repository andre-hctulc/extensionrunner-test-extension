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
    provider: "",
    out: {
        // handle via function
        print: function (...text) {
            // this refers to the adapter here
            const container = document.getElementById("print");
            if (container) container.innerHTML = text.join(" ");
        },
        increment: function () {
            return counter + (this.state.incr || 1);
        },
        reset: () => (counter = 0),
    },
}).start(adapter => {
    const container = document.getElementById("counter");

    // handle via event
    adapter.addEventListener("op:increment", ev => {
        if (!container) return;
        container.innerHTML = ev.payload.result ? ev.payload.result + (adapter.state.incr || 1) + "" : "ev.payload.result is undefined";
    });

    const echoBtn = document.getElementById("echo-btn") as HTMLButtonElement | null;
    const echoInp = document.getElementById("echo-input") as HTMLInputElement | null;
    const echoContainer = document.getElementById("echo") as HTMLParagraphElement | null;

    if (echoBtn && echoContainer && echoInp) {
        echoBtn.onclick = async () => {
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
