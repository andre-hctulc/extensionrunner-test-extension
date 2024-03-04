import Adapter from "extensionrunner/adapter";

const adapter = new Adapter({ provider: "", out: {} });

adapter.addEventListener("increment_counter", newCounter => {
    document.getElementById("counter").innerText = newCounter;
});

const triggerEchoBtn = document.getElementById("echo-btn");

if (triggerEchoBtn) {
    triggerEchoBtn.onClick = () => {
        echo();
    };
}

function echo() {
    const inp = document.getElementById("echo-input");
    adapter.execute("echo", inp && inp.value ? inp.value : "<empty>");
}
