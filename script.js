
document.getElementById('findButton').addEventListener('click', () => {
    const countryName = document.getElementById('country-name').value.trim();
    


    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            
            document.getElementById('capital').textContent = `Capital: ${country.capital[0]}`;
            document.getElementById('population').textContent = `Population: ${country.population.toLocaleString()}`;
            document.getElementById('region').textContent = `Region: ${country.region}`;
            document.getElementById('flag').innerHTML = `Flag:<br> <img src="${country.flags.png}" alt="Flag">`;

            const bordersList = document.getElementById('bordering-list');
            bordersList.innerHTML = ''; 

            if (country.borders) {
                country.borders.forEach(borderCode => {
                    fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                        .then(response => response.json())
                        .then(data => {
                            const borderCountry = data[0];
                            const listItem = document.createElement('li');
                            listItem.innerHTML = `${borderCountry.name.common} <img src="${borderCountry.flags.png}" alt="${borderCountry.name.common} Flag">`;
                            bordersList.appendChild(listItem);
                        })
                        .catch(error => {
                            console.error('Error fetching bordering country:', error);
                        });
                });
            }
        })
        .catch(error => {
            alert(error.message);
        });
});
