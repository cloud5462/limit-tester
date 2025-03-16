const transactionCache = new Map();

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    if (username === "admin" && password === "Dllip@1234") {
        loginMessage.textContent = "Login successful!";
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("dashboardContainer").style.display = "block";
    } else {
        loginMessage.textContent = "Invalid credentials.";
    }
}

function showBankDetails() {
    document.getElementById("dashboardContainer").style.display = "none";
    document.getElementById("bankContainer").style.display = "block";
}

function validateForm(event) {
    event.preventDefault();
    const bankName = document.getElementById("bankName").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const ifscCode = document.getElementById("ifscCode").value;
    const accountHolder = document.getElementById("accountHolder").value;
    const key = `${accountNumber}-${accountHolder}`;
    const message = document.getElementById("message");

    if (transactionCache.has(key)) {
        const cachedLimit = transactionCache.get(key);
        message.textContent = "Transaction limit is " + cachedLimit;
        return;
    }

    if (bankName && accountNumber.length >= 9 && accountNumber.length <= 18 && ifscCode && accountHolder) {
        if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
            let transactionLimit;
            if (["ICICI Bank", "Punjab National Bank", "IDBI", "Yes Bank", "HDFC Bank"].includes(bankName)) {
                transactionLimit = "1 crore";
            } else {
                const randomLimit = Math.floor(Math.random() * (3000000 - 500000 + 1)) + 500000;
                transactionLimit = randomLimit.toLocaleString("en-IN");
            }
            transactionCache.set(key, transactionLimit);
            message.textContent = "Transaction limit is " + transactionLimit;
        } else {
            alert("Invalid IFSC Code format");
        }
    } else {
        alert("Please fill all the fields correctly.");
    }
}
