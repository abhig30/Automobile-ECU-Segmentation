// ECU Memory Segments
const memory = {
    code: { base: 1000, limit: 500 },
    data: { base: 2000, limit: 400 },
    stack: { base: 3000, limit: 300 },
    io: { base: 4000, limit: 200 }
};

// Sub-segments for Data Segment
const subSegments = {
    sensor: { base: 0, limit: 200 },
    diagnostic: { base: 200, limit: 200 }
};

// Button event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("translateBtn")
        .addEventListener("click", translateAddress);
});

function translateAddress() {

    const segment = document.getElementById("segment").value;
    const subsegment = document.getElementById("subsegment").value;
    const offset = parseInt(document.getElementById("offset").value);
    const output = document.getElementById("output");

    output.innerHTML = "";

    if (!segment || isNaN(offset)) {
        output.innerHTML = "❌ Please select segment and enter offset.";
        return;
    }

    const seg = memory[segment];

    if (offset >= seg.limit) {
        output.innerHTML = "🚫 Segmentation Fault: Offset exceeds segment limit!";
        return;
    }

    let physicalAddress = seg.base + offset;

    // Multilevel segmentation for Data segment
    if (segment === "data" && subsegment) {
        const sub = subSegments[subsegment];
        if (offset >= sub.limit) {
            output.innerHTML = "🚫 Sub-Segmentation Fault!";
            return;
        }
        physicalAddress = seg.base + sub.base + offset;
    }

    output.innerHTML = `
        ✅ Address Translation Successful <br>
        <b>Segment:</b> ${segment.toUpperCase()} <br>
        <b>Offset:</b> ${offset} <br>
        <b>Physical Address:</b> ${physicalAddress}
    `;
}
