import {verifyHKIdCheckDigit,verifyFullHKId} from "../hkid/hkid"

test("Verify HKID (7 characters with number check digit) success", () => {
    expect(verifyHKIdCheckDigit("A123456", "3")).toBe(true);
});

test("Verify HKID (7 characters with english character check digit) success", () => {
    expect(verifyHKIdCheckDigit("C345678", "A")).toBe(true);
});

test("Verify HKID (8 characters with number check digit) success", () => {
    expect(verifyHKIdCheckDigit("EU135790", "2")).toBe(true);
});

test("Verify HKID (8 characters with english character check digit) success", () => {
    expect(verifyHKIdCheckDigit("TJ987654", "A")).toBe(true);
});


test("HKID with 7 characters and fail", () => {
    expect(verifyHKIdCheckDigit("R456789", "7")).toBe(false);
});

test("Verify HKID with 8 characters and fail", () => {
    expect(verifyHKIdCheckDigit("LQ246802", "4")).toBe(false);
});

test("HKID with 6 characters (One english character prefix and 5 number) and throw error", () => {
    expect(verifyHKIdCheckDigit("A12345", "3")).toBe(false);
});

test("HKID with 7 characters (Two english character prefix and 5 number) and throw error", () => {
    expect(verifyHKIdCheckDigit("EU13579", "2")).toBe(false);
});

test("HKID with 8 characters (One english character prefix and 7 number) and throw error", () => {
    expect(verifyHKIdCheckDigit("A1234567", "7")).toBe(false);
});

test("HKID with 9 characters (Two english character prefix and 7 number) and throw error", () => {
    expect(verifyHKIdCheckDigit("EU1357901", "7")).toBe(false);
});

test("HKID with 8 characters (One english character prefix and 7 number) and success", () => {
    expect(verifyFullHKId("A1234563")).toBe(true);
});

test("HKID with 9 characters (Two english character prefix and 7 number) and success", () => {
    expect(verifyFullHKId("EU1357902")).toBe(true);
});