document.getElementById('ipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const ipAddress = document.getElementById('ipAddress').value;
    const apiToken = '7f60cdd52a7e71'; // Replace YOUR_API_TOKEN with your actual API token from ipinfo.io
    fetch(`https://ipinfo.io/${ipAddress}/json?token=${apiToken}`)
        .then(response => response.json())
        .then(data => {
            // Assuming data contains zip, city, region, country, org, and loc fields
            const infoHTML = `
                IP Address: ${ipAddress}<br>
                Zip Code: ${data.postal}<br>
                City: ${data.city}<br>
                Region: ${data.region}<br>
                Country: ${data.country}<br>
                Organization: ${data.org}<br>
                Coordinates: ${data.loc}
            `;
            document.getElementById('result').innerHTML = infoHTML;
            // const zipCode = data.postal;
            // const city = data.city;
            // const region = data.region;
            // const country = data.country;
            // const organization = data.org;
            // const coordinates = data.loc;
            // document.getElementById('result').textContent = `Zip Code: ${zipCode}<br>City: ${city} Region: ${region} Country: ${country} Organization: ${organization}<br> Coordinates: ${coordinates}`;
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
            document.getElementById('result').textContent = 'Failed to retrieve IP information. Please check the IP address and try again.';
        });
});

// Create a pull-request
