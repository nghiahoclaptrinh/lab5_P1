/**
 * File điều phối các module mã hóa đối xứng
 * - DES/3DES: xem des_3des.js
 * - AES: xem aes.js
 */

function runSymmetric(algo, mode, key, action, input) {
    if (algo === "des" || algo === "3des") {
        return runDES(algo, mode, key, action, input);
    }

    if (algo === "aes") {
        if (action === "encrypt") {
            return AESModule.encrypt(input, key, mode);
        }

        if (action === "decrypt") {
            return AESModule.decrypt(input, key, mode);
        }

        throw new Error("Action không hợp lệ. Chỉ hỗ trợ encrypt hoặc decrypt.");
    }

    throw new Error("Thuật toán đối xứng không hợp lệ.");
}

function generateSymmetricKey() {
    const algo = document.getElementById("algorithm").value;

    if (algo === "aes") {
        return AESModule.generateKey(256);
    }

    if (algo === "des" || algo === "3des") {
        return generateDESKey(algo);
    }

    throw new Error("Thuật toán này không hỗ trợ tạo key đối xứng.");
}