// aes.js
// AES module using CryptoJS

function validateAESKey(keyInput) {
    if (!keyInput || keyInput.trim() === "") {
        throw new Error("AES key không được để trống.");
    }

    const key = keyInput.trim();

    // Key dạng text: 16, 24, 32 ký tự
    // tương ứng AES-128, AES-192, AES-256
    if ([16, 24, 32].includes(key.length)) {
        return CryptoJS.enc.Utf8.parse(key);
    }

    // Key dạng Hex: 32, 48, 64 ký tự
    // tương ứng 16, 24, 32 bytes
    const isHex = /^[0-9a-fA-F]+$/.test(key);

    if (isHex && [32, 48, 64].includes(key.length)) {
        return CryptoJS.enc.Hex.parse(key);
    }

    throw new Error(
        "Key AES không hợp lệ. Key phải dài 16, 24, 32 ký tự text hoặc 32, 48, 64 ký tự Hex."
    );
}

const AESModule = {
    generateKey: function (size = 256) {
        if (![128, 192, 256].includes(size)) {
            throw new Error("AES chỉ hỗ trợ key 128, 192 hoặc 256 bit.");
        }

        const bytes = size / 8;
        return CryptoJS.lib.WordArray.random(bytes).toString(CryptoJS.enc.Hex);
    },

    encrypt: function (plaintext, keyInput) {
    if (!plaintext || plaintext.trim() === "") {
        throw new Error("Plaintext không được để trống.");
    }

    const key = validateAESKey(keyInput);

    // CBC cần IV 16 bytes
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const ivHex = iv.toString(CryptoJS.enc.Hex);
    const cipherHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    // Lưu cả IV và ciphertext để giải mã được
    return ivHex + ":" + cipherHex;
},
    

    decrypt: function (ciphertextInput, keyInput) {
    if (!ciphertextInput || ciphertextInput.trim() === "") {
        throw new Error("Ciphertext không được để trống.");
    }

    const key = validateAESKey(keyInput);

    const parts = ciphertextInput.trim().split(":");

    if (parts.length !== 2) {
        throw new Error("Ciphertext sai định dạng. Định dạng đúng là ivHex:cipherHex.");
    }

    const ivHex = parts[0];
    const cipherHex = parts[1];

    if (!/^[0-9a-fA-F]+$/.test(ivHex) || ivHex.length !== 32) {
        throw new Error("IV không hợp lệ. IV phải là 32 ký tự Hex.");
    }

    if (!/^[0-9a-fA-F]+$/.test(cipherHex)) {
        throw new Error("Ciphertext không hợp lệ. Ciphertext phải là chuỗi Hex.");
    }

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(cipherHex);

    const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
        throw new Error("Giải mã thất bại. Key hoặc ciphertext không đúng.");
    }

    return plaintext;
}
};

window.AESModule = AESModule;