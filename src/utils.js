export const baseByTip = { Hatchback: 0, Sedan: 50, SUV: 120, Van: 180 };
export const pachete = { Basic: 499, Premium: 1199, Ultra: 2399 };
export const addonPret = { polish: 350, ceramic: 900, geamuri: 150, ozon: 120 };

export function priceEstimate({ tip = "Sedan", pachet = "Basic", add = {} }) {
    const extras = Object.entries(add).reduce((s, [k, v]) => (v ? s + (addonPret[k] || 0) : s), 0);
    return (pachete[pachet] || 0) + (baseByTip[tip] || 0) + extras;
}

export function validateBooking(form) {
    const emailOk = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/.test(form.email || "");
    const phoneOk = /(\+4)?0?7\d{2}[- ]?\d{3}[- ]?\d{3}/.test(form.phone || "") || (form.phone || "").length >= 8;
    return Boolean((form.name || "").trim() && emailOk && phoneOk && form.date && form.time);
}

// mici „teste” rulate în consolă
export function runLightTests() {
    try {
        const assert = (name, cond) => { if (!cond) throw new Error(name); };
        assert("validateBooking rejects missing name", !validateBooking({ name: "", email: "a@b.ro", phone: "0722", date: "2025-01-01", time: "10:00" }));
        assert("validateBooking accepts valid", validateBooking({ name: "Ana", email: "a@b.ro", phone: "0722123456", date: "2025-01-01", time: "10:00" }));
        const t1 = priceEstimate({ tip: "Sedan", pachet: "Premium", add: { ceramic: true, ozon: true } });
        const expected = pachete.Premium + baseByTip.Sedan + addonPret.ceramic + addonPret.ozon;
        assert("priceEstimate exact", t1 === expected);
        console.info("✅ Tests passed");
    } catch (e) {
        console.error("❌ Test failed:", e.message);
    }
}
