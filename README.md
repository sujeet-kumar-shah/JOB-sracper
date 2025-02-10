# 🚀 LinkedIn Job Scraper 🔍

![Puppeteer](https://img.shields.io/badge/Puppeteer-✔️-blue) 
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14-green) 
![Automation](https://img.shields.io/badge/Automation-✔️-red)

## 📜 **Overview**
This project is an **automated LinkedIn job post scraper** built using **Puppeteer** with **stealth and ad-blocking capabilities**. It logs into LinkedIn, navigates to job posts, expands post details, extracts **HR contact information** (emails, phone numbers), and saves screenshots of relevant posts.

⚡ **Key Features:**
- ✅ **Automated Login** using environment variables.
- ✅ **Scrolls & Loads More Posts** dynamically.
- ✅ **Expands “See more” in job posts** for complete visibility.
- ✅ **Extracts HR emails & phone numbers** (if available).
- ✅ **Saves job post screenshots** locally.
- ✅ **Uses Puppeteer Stealth Mode** to avoid detection.

---

## 🛠 **Setup Instructions**
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-username/linkedin-job-scraper.git
node scarper.js
```
Install Dependencies
```sh
npm install puppeteer-extra puppeteer-extra-plugin-stealth puppeteer-extra-plugin-adblocker
```
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add your LinkedIn credentials:

env
```sh
LINKEDIN_EMAIL=your-email@example.com
LINKEDIN_PASSWORD=your-secure-password
⚠ Tip: Use a separate LinkedIn account to prevent restrictions.
```
4️⃣ Run the Scraper
```sh

node scaper.js
```
🚀 Usage
The script logs into LinkedIn, navigates to #mohalijobs { you can put a link like #dotnet #developer  }, scrapes job-related posts, and saves screenshots.
HR emails & phone numbers (if available) are extracted & displayed in the console.
All screenshots are saved locally with filenames like job_post_1.png.
🔧 Technologies Used
Node.js (JavaScript Runtime)
Puppeteer (Headless Browser Automation)
dotenv (Secure Credentials Handling)
puppeteer-extra-plugin-stealth (Avoid Bot Detection)
puppeteer-extra-plugin-adblocker (Block Ads & Trackers)
🖼 Screenshots
![image](https://github.com/user-attachments/assets/7a7a12e8-0c7b-4b77-8764-6ab4dad11907)


🛡 Disclaimer
This project is for educational purposes only. Scraping LinkedIn is against its Terms of Service. Use responsibly.

🎯 Future Enhancements
📌 Apply directly via LinkedIn’s Easy Apply feature.
📌 Save job post data in a structured JSON/CSV format.
📌 Integrate with an AI-based resume matcher.
👨‍💻 Contributing
PRs are welcome! Feel free to fork, improve, and raise a pull request. 🚀

📬 Contact
For issues or suggestions, reach out at sujeetshah321s@gmail.com.

