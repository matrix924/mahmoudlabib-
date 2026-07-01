document.addEventListener('DOMContentLoaded', function () {
    const geoApiUrl = 'https://ipapi.co/json/';

    async function checkLocationAndSwitchPrices() {
        try {
            const response = await fetch(geoApiUrl);
            const data = await response.json();

            if (data.country_code && data.country_code !== 'EG') {
                switchToUSD();
            } else {
                // If in Egypt or country unknown, keep EGP (default)
                switchToEGP();
            }
        } catch (error) {
            console.error('Error fetching GeoIP data:', error);
            // Fallback to EGP is already handled by default HTML
        }
    }

    function switchToUSD() {
        // Switch main price elements
        const priceElements = [
            'price-6-weeks',
            'price-3-months',
            'price-6-months',
            'price-gold',
            'price-intensive-range',
            'price-consultation'
        ];

        priceElements.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.dataset.priceUsd) {
                el.innerHTML = el.dataset.priceUsd;
            }
        });

        // Switch intensive package details
        const intensiveDetails = document.getElementById('price-intensive-details');
        if (intensiveDetails && intensiveDetails.dataset.descUsd) {
            intensiveDetails.innerText = intensiveDetails.dataset.descUsd;
        }
    }

    function switchToEGP() {
        // Although default is EGP, we might want to re-apply if it was switched
        const priceElements = [
            'price-6-weeks',
            'price-3-months',
            'price-6-months',
            'price-gold',
            'price-intensive-range',
            'price-consultation'
        ];

        priceElements.forEach(id => {
            const el = document.getElementById(id);
            if (el && el.dataset.priceEgp) {
                el.innerHTML = el.dataset.priceEgp;
            }
        });

        const intensiveDetails = document.getElementById('price-intensive-details');
        if (intensiveDetails && intensiveDetails.dataset.descEgp) {
            intensiveDetails.innerText = intensiveDetails.dataset.descEgp;
        }
    }

    checkLocationAndSwitchPrices();
});
