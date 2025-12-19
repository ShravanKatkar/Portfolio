# Generative AI Portfolio

A modern, high-performance portfolio website for a Generative AI Engineer, built with Flask and powered by Google Gemini.

## 🚀 Features

- **Dynamic AI Chatbot**: A custom-trained digital avatar that answers questions about my background, skills, and experience using Google's Gemini 2.5 Flash model.
- **AI-Powered Contact Polish**: An "AI Polish" button in the contact form that rewrites drafts into professional inquiry emails.
- **Premium Design**: features glassmorphism, smooth scroll reveals, custom cursor, and interactive elements using Vanilla CSS and Tailwind.
- **Interactive Tech Arsenal**: Grid layout showcasing skills with specific icons (Devicon & Lucide).
- **Responsive**: Fully optimized for extensive mobile and desktop devices.
- **Social Integration**: Direct links to GitHub, LinkedIn, LeetCode, and HackerRank.

## 🛠️ Tech Stack

- **Backend**: Python, Flask, Google Gemini API
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Icons**: Lucide Icons, Devicon
- **Typography**: Syne, Outfit, JetBrains Mono (Google Fonts)

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ShravanKatkar/portfolio.git
    cd portfolio
    ```

2.  **Install Dependencies**
    ```bash
    pip install flask requests
    ```

3.  **Configure API Key**
    - Open `app.py`.
    - Replace the `API_KEY` variable with your valid Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the Application**
    ```bash
    python app.py
    ```
    The server will start at `http://127.0.0.1:5000`.

## 📂 Project Structure

```
my portfolio/
├── app.py              # Main Flask application and API logic
├── templates/          # HTML templates
│   └── portfolio.html  # Main portfolio page
├── README.md           # Project documentation
└── .env                # Environment variables (optional)
```

## 📧 Contact

**Shravan Katkar**  
Generative AI Engineer  
[shravankatkar818@gmail.com](mailto:shravankatkar818@gmail.com)  
[LinkedIn](https://www.linkedin.com/in/shravan-katkar-05b170283/)
