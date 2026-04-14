document.addEventListener('DOMContentLoaded', () => {
    const algorithmSelect = document.getElementById('algorithm');
    const inputArea = document.getElementById('input');
    const btnRun = document.getElementById('btn-run');
    const btnClear = document.getElementById('btn-clear');
    const btnCopy = document.getElementById('btn-copy');
    const resultBox = document.getElementById('result');

    const panelSymmetric = document.getElementById('panel-symmetric');
    const panelAsymmetric = document.getElementById('panel-asymmetric');

    // UI Toggling based on Selection
    function updateUI() {
        const algo = algorithmSelect.value;
        const group = algorithmSelect.options[algorithmSelect.selectedIndex].parentNode.label;

        if (group === 'Symmetric') {
            panelSymmetric.style.display = 'block';
            panelAsymmetric.style.display = 'none';
        } else if (group === 'Asymmetric') {
            panelSymmetric.style.display = 'none';
            panelAsymmetric.style.display = 'block';
        } else {
            // Hashing
            panelSymmetric.style.display = 'none';
            panelAsymmetric.style.display = 'none';
        }
    }

    algorithmSelect.addEventListener('change', updateUI);
    updateUI(); // Run once on load

    // Toast functionality
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = 'Copied to clipboard!';
    document.body.appendChild(toast);

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // --- Execution Logic ---
    btnRun.addEventListener('click', () => {
        const algo = algorithmSelect.value;
        const group = algorithmSelect.options[algorithmSelect.selectedIndex].parentNode.label;
        const input = inputArea.value.trim();

        if (!input) {
            resultBox.textContent = "Please enter some data first.";
            resultBox.classList.remove('has-content');
            resultBox.style.color = '#ef4444'; 
            return;
        }

        resultBox.style.color = ''; 
        let result = "";

        try {
            if (group === "Symmetric") {
                const mode = document.getElementById('sym-mode').value;
                const key = document.getElementById('sym-key').value;
                const action = document.querySelector('input[name="sym-action"]:checked').value;
                
                if (typeof runSymmetric === 'function') {
                    result = runSymmetric(algo, mode, key, action, input);
                } else {
                    result = "Symmetric module not yet implemented.";
                }
            } else if (group === "Asymmetric") {
                const action = document.querySelector('input[name="rsa-action"]:checked').value;
                const pubKey = document.getElementById('rsa-public-key').value;
                const privKey = document.getElementById('rsa-private-key').value;

                if (typeof runRSA === 'function') {
                    result = runRSA(action, pubKey, privKey, input);
                } else {
                    result = "RSA module not yet implemented.";
                }
            } else if (group === "Hashing") {
                if (typeof runHash === 'function') {
                    result = runHash(algo, input);
                } else {
                    result = "Hashing module not yet implemented.";
                }
            }
        } catch (error) {
            result = "Error executing algorithm: " + error.message;
        }

        resultBox.textContent = result;
        resultBox.classList.add('has-content');
    });

    btnClear.addEventListener('click', () => {
        inputArea.value = '';
        resultBox.textContent = 'No output yet.';
        resultBox.classList.remove('has-content');
        resultBox.style.color = '';
    });

    btnCopy.addEventListener('click', () => {
        const textToCopy = resultBox.textContent;
        if (!resultBox.classList.contains('has-content') || textToCopy.startsWith("Please enter")) {
            return;
        }

        navigator.clipboard.writeText(textToCopy).then(showToast).catch(console.error);
    });

    // Helper Buttons Logic
    document.getElementById('btn-gen-sym-key').addEventListener('click', () => {
        if (typeof generateSymmetricKey === 'function') {
            document.getElementById('sym-key').value = generateSymmetricKey();
        } else {
            console.error("generateSymmetricKey not implemented");
            document.getElementById('sym-key').value = "dummy-random-key-" + Date.now();
        }
    });

    document.getElementById('btn-gen-rsa').addEventListener('click', () => {
        if (typeof generateRSAKeys === 'function') {
            const keys = generateRSAKeys();
            document.getElementById('rsa-public-key').value = keys.public;
            document.getElementById('rsa-private-key').value = keys.private;
        } else {
            console.error("generateRSAKeys not implemented");
            document.getElementById('rsa-public-key').value = "dummy-public-key";
            document.getElementById('rsa-private-key').value = "dummy-private-key";
        }
    });
});
