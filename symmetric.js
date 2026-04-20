/**
 * File điều phối các module mã hóa đối xứng
 * - DES/3DES: Nhân - xem des_3des.js
 * - AES: Nguyên
 */

function runSymmetric(algo, mode, key, action, input) {
    if (algo === 'des' || algo === '3des') {
        //DES/3DES
        return runDES(algo, mode, key, action, input);
    } else if (algo === 'aes') {
        //AES
        throw new Error("AES chưa được implement.");
    }
}

function generateSymmetricKey() {
    // Dùng hàm tạo khóa của DES/3DES
    return generateDESKey();
}