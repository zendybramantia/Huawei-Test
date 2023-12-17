function validateForm() {
    var nama = document.getElementById('nama').value;
    var email = document.getElementById('email').value;
    var telepon = document.getElementById('telepon').value;

    if (nama === ''){
        alert('Nama tidak boleh kosongg!');
    }
    else if(email === '' ){
        alert('Email tidak boleh kosong!');
    }
    else if(telepon === '') {
        alert('Telepon tidak boleh kosong!');
    }
    else if(!isValidEmail(email)) {
        alert('Format email tidak valid!');
    }
    else if(!isValidNumber(telepon)) {
        alert('Format nomor telepon tidak valid!');
    }
    else{
        sendDataToApi({ nama, email, telepon });
    }
}

async function sendDataToApi(data) {
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            alert('Pendaftaran berhasil!');
        } else {
            const responseBody = await response.json();
            alert('Error: ' + responseBody.errors);
        };
      } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim permintaan.');
      }
};

function displayUserInfo() {
    var email = document.getElementById('emailInput').value;
    var userInfoContainer = document.getElementById('userInfo');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

function isValidNumber(input) {
    const numberRegex = /^\d+$/
    const isValid = numberRegex.test(input);

    return isValid;
};