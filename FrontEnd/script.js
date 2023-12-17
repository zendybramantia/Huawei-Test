async function displayDataFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
            throw new Error('Failed to retrieve data from API');
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
        var cellName = newRow.insertCell(0);
        var cellEmail = newRow.insertCell(1);
        var cellPhone = newRow.insertCell(2);

        cellName.innerHTML = item.name;
        cellEmail.innerHTML = item.email;
        cellPhone.innerHTML = item.phone;
    }); 
}

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password').value;

    if (name === ''){
        alert('Name cannot be empty!');
    }
    else if(email === '' ){
        alert('Email cannot be empty!');
    }
    else if(phone === '') {
        alert('Phone number cannot be empty!');
    }
    else if(password === '') {
        alert('Password cannot be empty!');
    }
    else if(!isValidEmail(email)) {
        alert('Email format is invalid!');
    }
    else if(!isValidNumber(phone)) {
        alert('Phone number format is invalid!');
    }
    else{
        sendDataToApi({ name, email, phone , password});
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
            alert('Register Success!');
        } else {
            const responseBody = await response.json();
            alert('Error: ' + responseBody.errors);
        };
      } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the request.');
      }
};

function displayUserInfo() {
    var email = document.getElementById('emailInput').value;
    var userInfoContainer = document.getElementById('userInfo');

    fetch('http://localhost:3000/api/users/' + email)
    .then(response => {
        if (!response.ok) {
        throw new Error('Failed to retrieve user data');
        }
        return response.json();
    })
    .then(userData => {
        userInfoContainer.innerHTML = `
        <h2>User Info</h2>
        <p><strong>Name:</strong> ${userData.data.name}</p>
        <p><strong>Email:</strong> ${userData.data.email}</p>
        <p><strong>Phone:</strong> ${userData.data.phone}</p>
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