import Adapter from "extensionrunner/adapter"

const adapterApi = {
    echo: text => {
        return text
    },
    print: (...text) => {
        console.log(...text)
    }
}

new Adapter({
    provider: "https://example.com",
    out: adapterApi
}).start(async adapter => {
    adapter.execute("alert", "module running...")
    console.log("The sum of 40 and 2 is", await adapter.execute("sum", 2, 40))
})
