/**
 * Module for Asymmetric Encryption (RSA)
 * To be implemented by Team Member B
 * 
 * Uses JSEncrypt library for reliable RSA math in Javascript
 */

/**
 * Generates an RSA Public and Private Key Pair (1024-bit for fast browser execution)
 * @returns {Object} Object containing public and private keys
 */
function generateRSAKeys() {
    console.log("Generating RSA Keys (1024-bit)...");
    
    // Create a new JSEncrypt instance and generate a key pair
    const crypt = new JSEncrypt({ default_key_size: 1024 });
    crypt.getKey();
    
    return {
        public: crypt.getPublicKey(),
        private: crypt.getPrivateKey()
    };
}

/**
 * Main execution function for RSA
 * @param {string} action "encrypt" or "decrypt"
 * @param {string} publicKey The public key string
 * @param {string} privateKey The private key string
 * @param {string} inputData The text/ciphertext to process
 * @returns {string} The final result
 */
function runRSA(action, publicKey, privateKey, inputData) {
    console.log(`Running RSA. Action: ${action}`);
    
    // Initialize JSEncrypt
    const crypt = new JSEncrypt();

    if (action === 'encrypt') {
        if (!publicKey) {
            throw new Error("Public Key is missing. Please generate or paste a public key.");
        }
        
        crypt.setPublicKey(publicKey);
        const encryptedResult = crypt.encrypt(inputData);
        
        if (!encryptedResult) {
            throw new Error("Encryption failed. The input text might be too large for a 1024-bit key.");
        }
        return encryptedResult;

    } else if (action === 'decrypt') {
        if (!privateKey) {
            throw new Error("Private Key is missing. Please generate or paste a private key.");
        }

        crypt.setPrivateKey(privateKey);
        const decryptedResult = crypt.decrypt(inputData);
        
        if (decryptedResult === null || decryptedResult === false) {
            throw new Error("Decryption failed. Ensure the input data is a valid Base64 RSA ciphertext and the Private Key is correct.");
        }
        return decryptedResult;
    }
}
