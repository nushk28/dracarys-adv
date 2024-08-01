async function translateText() {
    const highValyrianText = document.getElementById('highValyrianText').value;
    const url = 'https://api.funtranslations.com/translate/valyrian.json';
    const data = { text: highValyrianText };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data),
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            const englishText = jsonResponse.contents.translated;
            document.getElementById('englishText').innerText = englishText;
        } else {
            const errorResponse = await response.json();
            document.getElementById('englishText').innerText = `Error: ${errorResponse.error.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('englishText').innerText = 'An error occurred while translating the text.';
    }
}
