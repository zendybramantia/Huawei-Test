async function displayDataFromAPI() {
    try {
        
        var bearerToken = localStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:3000/api/users', {
            headers: {
                Authorization: 'Bearer ' + bearerToken,
                'Content-Type': 'application/json'
            },
        });
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

function displayUserInfo() {
    var email = document.getElementById('emailInput').value;
    var userInfoContainer = document.getElementById('userInfo');

    var bearerToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:3000/api/users/' + email, {
        headers: {
            Authorization: 'Bearer ' + bearerToken,
            'Content-Type': 'application/json'      
        }
    })
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
        userInfoContainer.innerHTML = '<p>Failed to get user data.</p>';
    });
}