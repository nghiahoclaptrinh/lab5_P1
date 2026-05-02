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
        // sẽ làm ở commit sau
    },

    decrypt: function (ciphertextInput, keyInput) {
        // sẽ làm ở commit sau
    }
};

window.AESModule = AESModule;