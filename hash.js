/**
 * Module for Hashing (MD5, SHA-256)
 * Implemented by: Ho A Nhat Luu - N23DCCN173
 */

/**
 * Main execution function for Hashing
 * @param {string} algo "md5" or "sha256"
 * @param {string} inputData The incoming text to hash
 * @returns {string} The generated hash output
 */
function runHash(algo, inputData) {
  console.log(`Running Hash algorithm: ${algo.toUpperCase()}`);

  let hashResult = "";

  if (algo === "md5") {
    hashResult = CryptoJS.MD5(inputData).toString();
  } else if (algo === "sha256") {
    hashResult = CryptoJS.SHA256(inputData).toString();
  }

  return hashResult;
}
