 // ECU Memory Segments
const memory = {
    code: { base: 1000, limit: 500 },
    data: { base: 2000, limit: 400 },
    stack: { base: 3000, limit: 300 },
    io: { base: 4000, limit: 200 }
};

// Sub-segments for Data segment
const subSegments = {
    sensor: { base: 0, limit: 200 },
    diagnostic: { base: 200, limit: 200 }
};

// Ensure page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("✅ JavaScript Loaded");

    document.getElementById("translateBtn")
        .addEventListener("click", translate);
});

function translate() {

    console.log("🟢 Translate button clicked");

    const segment = document.getElementById("segment").value;
    const sub = document.getElementById("subsegment").value;
    const offsetVal = document.getElementById("offset").value;
    const output = document.getElementById("output");

    output.innerHTML = "";

    if (segment === "") {
        output.innerHTML = "❌ Please select a segment.";
        return;
    }

    if (offsetVal === "") {
        output.innerHTML = "❌ Please enter an offset.";
        return;
    }

    const offset = parseInt(offsetVal);
    const seg = memory[segment];

    if (offset < 0 || offset >= seg.limit) {
        output.innerHTML = `🚫 Segmentation Fault! Offset must be < ${seg.limit}`;
        return;
    }

    let physicalAddress = seg.base + offset;

    if (segment === "data") {
        if (sub === "") {
            output.innerHTML = "❌ Please select a sub-segment.";
            return;
        }

        const subSeg = subSegments[sub];

        if (offset >= subSeg.limit) {
            output.innerHTML = `🚫 Sub-Segmentation Fault! Offset must be < ${subSeg.limit}`;
            return;
        }

        physicalAddress = seg.base + subSeg.base + offset;
    }

    output.innerHTML = `
        ✅ <b>Address Translation Successful</b><br><br>
        <b>Segment:</b> ${segment.toUpperCase()}<br>
        <b>Sub-Segment:</b> ${segment === "data" ? sub.toUpperCase() : "N/A"}<br>
        <b>Offset:</b> ${offset}<br>
        <b>Physical Address:</b> ${physicalAddress}
    `;
}
