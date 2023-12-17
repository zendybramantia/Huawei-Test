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
            window.location.href = '../login/login.html';
        } else {
            const responseBody = await response.json();
            alert('Error: ' + responseBody.errors);
        };
      } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the request.');
      }
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
};

function isValidNumber(input) {
    const numberRegex = /^\d+$/
    const isValid = numberRegex.test(input);

    return isValid;
};