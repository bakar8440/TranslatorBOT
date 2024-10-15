// Variables for speech recognition
let recognition;
let isRecording = false;

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        let transcript = event.results[event.resultIndex][0].transcript;
        document.getElementById('transcription').textContent = transcript;
        // Send the transcription for translation
        translateText(transcript);
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error: ", event.error);
    };
}

// Start recording
document.getElementById('start-recording').onclick = function() {
    if (!isRecording) {
        recognition.start();
        isRecording = true;
        document.getElementById('start-recording').disabled = true;
        document.getElementById('stop-recording').disabled = false;

        // Add bounce animation
        addBounceAnimation('start-recording');
        // Show "Listening..." in transcription box
        document.getElementById('transcription').textContent = "Listening...";
    }
};

// Stop recording
document.getElementById('stop-recording').onclick = function() {
    if (isRecording) {
        recognition.stop();
        isRecording = false;
        document.getElementById('start-recording').disabled = false;
        document.getElementById('stop-recording').disabled = true;

        // Add bounce animation
        addBounceAnimation('stop-recording');
    }
};

// Translate manual text
document.getElementById('translate-manual').onclick = function() {
    const manualText = document.getElementById('manual-input').value;
    if (manualText.trim()) {
        translateText(manualText); // Send the manual input for translation
    } else {
        alert("Please enter text for translation.");
    }
};

// Translate text
function translateText(text) {
    const language = document.getElementById('language-select').value;
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text, language: language })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').textContent = data.translatedText;
        document.getElementById('hashtags').textContent = `Hashtags: ${data.hashtags}`;
        document.getElementById('summary').textContent = `Summary: ${data.summary}`;
    })
    .catch(err => console.error('Translation Error:', err));
}

// Function to add and remove bounce animation
function addBounceAnimation(buttonId) {
    const button = document.getElementById(buttonId);
    button.classList.add('bounce');
    setTimeout(() => {
        button.classList.remove('bounce');
    }, 500); // Match the duration of the bounce animation (0.5s)
}
