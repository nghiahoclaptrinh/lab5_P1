/**
 * Module: Mã hóa DES và 3DES
 * Thành viên: Nhân
 * Thư viện: CryptoJS
 */

/**
 * Tạo khóa ngẫu nhiên cho DES/3DES
 * @returns {string} Chuỗi hex
 */
function generateDESKey() {
    // Tạo khóa 24 byte - 8 byte (64 bit) cho DES và 24 byte (192 bit) cho 3DES
    const randomBytes = CryptoJS.lib.WordArray.random(24);
    return CryptoJS.enc.Hex.stringify(randomBytes);
}

/**
 * Mã hóa / Giải mã bằng DES hoặc 3DES
 * @param {string} algo   - "des" | "3des"
 * @param {string} mode   - "cbc" | "ecb"
 * @param {string} key    - Khóa bí mật
 * @param {string} action - "encrypt" | "decrypt"
 * @param {string} input  - Dữ liệu đầu vào
 * @returns {string} Kết quả
 */
function runDES(algo, mode, key, action, input) {
    // Kiểm tra khóa có tồn tại hay không
    if (!key) {
        throw new Error("Thiếu khóa. Vui lòng nhập khóa.");
    }

    // chọn thuật toán
    let cipher;
    if (algo === "des") {
        cipher = CryptoJS.DES;
    } else if (algo === "3des") {
        cipher = CryptoJS.TripleDES;
    } else {
        throw new Error("Thuật toán không hợp lệ: " + algo);
    }

    // chọn chế độ
    let cipherMode;
    if (mode === "cbc") {
        cipherMode = CryptoJS.mode.CBC;
    } else if (mode === "ecb") {
        cipherMode = CryptoJS.mode.ECB;
    } else {
        throw new Error("Chế độ không hợp lệ: " + mode);
    }

    // TODO: Xử lý encrypt và decrypt
    // Parse khóa sang WordArray
    const keyParsed = CryptoJS.enc.Utf8.parse(key);

    // Cấu hình các tham số chung
    const options = {
        mode: cipherMode,
        padding: CryptoJS.pad.Pkcs7,
    };

    // CBC cần IV - lấy 8 byte đầu tiên của khóa làm IV
    if (mode === "cbc") {
        const ivString = key.substring(0, 8).padEnd(8, '0'); // Đảm bảo IV có độ dài 8 byte
        options.iv = CryptoJS.enc.Utf8.parse(ivString);
    }

    if (action === "encrypt") {
        // Mã hóa và trả về kết quả dưới dạng chuỗi Base64
        const encrypted = cipher.encrypt(input, keyParsed, options);
        return encrypted.toString();
    }


}