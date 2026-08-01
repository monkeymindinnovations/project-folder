const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fantasy_blog')
.then(() => {
    console.log("✅ MongoDB Connected Successfully");
    seedDatabase(); 
}).catch(err => console.log("❌ MongoDB Error:", err));

// API: Get all posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API: Create Post
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.json({ message: "Post saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 10 Seed Stories
async function seedDatabase() {
    const count = await Post.countDocuments();
    if (count === 0) {
        const seedStories = [
            { title: "भाभी की प्यास", category: "देवर-भाभी", content: "सुमित जब कॉलेज से घर लौटा, तो उसकी नजर अपनी भाभी रश्मि पर पड़ी। रश्मि ने एक पतली सी गुलाबी साड़ी पहनी थी..." },
            { title: "ऑफिस की वो रात", category: "ऑफिस रोमांस", content: "रात के 9 बज रहे थे। ऑफिस में सिर्फ नेहा और उसका बॉस राहुल बचे थे। राहुल ने नेहा को अपने केबिन में बुलाया..." },
            { title: "बारिश और पड़ोसन", category: "पड़ोसन", content: "बाहर तेज बारिश हो रही थी। तभी मेरे दरवाजे पर घंटी बजी। सामने कविता आंटी खड़ी थीं, पूरी तरह भीगी हुई..." },
            { title: "ट्रेन का सफर", category: "ट्रेन का सफर", content: "रात का सफर था, एसी कोच में लाइटें बंद थीं। मेरे सामने वाली बर्थ पर एक खूबसूरत अजनबी लड़की सो रही थी..." },
            { title: "जिम ट्रेनर की मसाज", category: "जिम ट्रेनर", content: "जिम में हैवी वर्कआउट के बाद रिया के पैरों में बहुत दर्द था। उसके ट्रेनर विक्रम ने उसे स्ट्रेचिंग रूम में बुलाया..." },
            { title: "हनीमून का सरप्राइज", category: "हनीमून", content: "मनाली की ठंडी रात में, बिस्तर पर गुलाब की पंखुड़ियां बिखरी थीं। पायल लाल रंग की एक बेहद पारदर्शी नाइटी में खड़ी थी..." },
            { title: "सहेली की माँ", category: "सहेली की माँ", content: "मैं अपने दोस्त के घर पढ़ाई करने गया था। दोस्त की माँ तौलिया लपेटे हुए बाथरूम से निकलीं और बोलीं..." },
            { title: "कामवाली बाई", category: "नौकरानी", content: "मुन्नी जब घर में झाड़ू लगा रही थी, तो उसकी साड़ी का पल्लू गिर रहा था। वो मेरे पास आई और बोली..." },
            { title: "प्राइवेट लेसन", category: "टीचर-स्टूडेंट", content: "गणित की ट्यूशन के बाद, मैडम ने मुझे रुकने को कहा। कमरे में हम दोनों अकेले थे। उन्होंने कहा..." },
            { title: "मसाज पार्लर", category: "मसाज पार्लर", content: "मैंने एक फुल बॉडी रिलैक्सेशन मसाज बुक की थी। लड़की ने तेल से मालिश शुरू की, और फिर..." }
        ];
        await Post.insertMany(seedStories);
        console.log("✅ 10 Seed stories added to Database!");
    } else {
        console.log(`✅ Database already has ${count} stories.`);
    }
}

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});