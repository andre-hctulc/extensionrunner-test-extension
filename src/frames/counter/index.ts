import Adapter from "../../../../Adapter";
import ProviderInterface from "../../ProviderInterface";

interface Out {
    print: (...text: string[]) => void;
    increment: () => number;
}

let counter = 0;

new Adapter<ProviderInterface, Out, any>({
    provider: "",
    out: {
        // handle via function
        print: function (...text) {
            // this refers to the adapter here
            const container = document.getElementById("print");
            if (container) container.innerHTML = text.join(" ");
        },
        increment: () => {
            return ++counter;
        },
    },
}).start(adapter => {
    const container = document.getElementById("counter");

    // handle via event
    adapter.addEventListener("op:increment", ev => {
        if (!container) return;
        container.innerHTML = ev.payload.result ? ++ev.payload.result + "" : "ev.payload.result is undefined";
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
});
