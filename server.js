import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { translate } from 'google-translate-api-x'; // Use the correct import

const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS for all routes

// Translation Route
app.post('/translate', async (req, res) => {
    const { text, language } = req.body;

    try {
        // Use the 'translate' function directly from '@vitalets/google-translate-api'
        const response = await translate(text, { to: language });
        const translatedText = response.text;

        // Dummy NLP functions for hashtag and summary generation
        const hashtags = generateHashtags(text);
        const summary = summarizeText(text);

        // Return translated text, hashtags, and summary
        res.json({ translatedText, hashtags, summary });
    } catch (error) {
        console.error('Error with translation:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

// Dummy NLP functions
function generateHashtags(text) {
    // Placeholder for actual NLP logic for hashtag generation
    return "#example #bot #nlp";
}

function summarizeText(text) {
    // Placeholder for actual NLP logic for summarization
    return "This is a summary of the text.";
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});