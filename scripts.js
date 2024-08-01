document.addEventListener("DOMContentLoaded", loadSelections);

async function loadSelections() {
    const character = JSON.parse(localStorage.getItem('selectedCharacter'));
    const dragon = JSON.parse(localStorage.getItem('selectedDragon'));

    if (character && dragon) {
        document.getElementById('characterImage').src = character.image;
        document.getElementById('characterName').innerText = character.name;
        document.getElementById('dragonImage').src = dragon.image;
        document.getElementById('dragonName').innerText = dragon.name;
    }
}

async function translateText() {
    const englishText = document.getElementById('englishTextInput').value;
    const url = 'https://api.funtranslations.com/translate/valyrian.json';
    const data = { text: englishText };

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
            const valariyanTextOutput = jsonResponse.contents.translated;
            document.getElementById('valariyanTextOutput').innerText = valariyanTextOutput;
        } else {
            const errorResponse = await response.json();
            document.getElementById('valariyanTextOutput').innerText = `Error: ${errorResponse.error.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('valariyanTextOutput').innerText = 'An error occurred while translating the text.';
    }
}

function clearText() {
    document.getElementById('englishTextInput').value = '';
    document.getElementById('valariyanTextOutput').innerText = '';
}
