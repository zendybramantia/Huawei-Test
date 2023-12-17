async function displayDataFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari API');
        }
        const data = await response.json();
        addDataToTable(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
  
displayDataFromAPI();
  
function addDataToTable(data) {
    var tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.data.forEach(item => {
        var newRow = tableBody.insertRow();
        var cellNama = newRow.insertCell(0);
        var cellEmail = newRow.insertCell(1);
        var cellTelepon = newRow.insertCell(2);

        cellNama.innerHTML = item.nama;
        cellEmail.innerHTML = item.email;
        cellTelepon.innerHTML = item.telepon;
    });
}

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

    fetch('http://localhost:3000/api/users/' + email)
    .then(response => {
        if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
        }
        return response.json();
    })
    .then(userData => {
        userInfoContainer.innerHTML = `
        <h2>Informasi Pengguna</h2>
        <p><strong>Nama:</strong> ${userData.data.nama}</p>
        <p><strong>Email:</strong> ${userData.data.email}</p>
        <p><strong>Telepon:</strong> ${userData.data.telepon}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error.message);
        userInfoContainer.innerHTML = '<p>Gagal mengambil data pengguna.</p>';
    });
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