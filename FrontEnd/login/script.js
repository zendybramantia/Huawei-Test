function validateForm() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if(email === '' ){
        alert('Email cannot be empty!');
    }
    else if(password === '') {
        alert('Password cannot be empty!');
    }
    else{
        sendDataToApi({email, password});
    }
}

async function sendDataToApi(data) {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.ok) {
            alert('Login Success!');
            const responseBody = await response.json();
            localStorage.setItem('jwtToken',  responseBody.data);
            window.location.href = '../dashboard/dashboard.html';
        } else {
            const responseBody = await response.json();
            alert('Error: ' + responseBody.errors);
        };
      } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the request.');
      }
};