# 🐍 Team S3-erpent

> **AI-powered portfolio risk analysis for financial and legislative documents — built entirely on AWS.**

---

### 🔗 Links  
- 🎥 [YouTube Demo](#)  
- 💻 [Devpost Submission](#)  
- 🌐 [Live Deployment](#)

---

### 🧠 Overview  

S3-erpent is a fully AWS-integrated system that automatically analyzes large-scale financial or legislative documents — such as SEC filings, K10 reports, or proposed laws — and evaluates their potential impact on a given stock portfolio.  

Our platform processes these reports, compares them to your existing portfolio (e.g., the **S&P 500**), and provides **data-driven insights, risk scores, and portfolio adjustment recommendations**.  

This enables investors and analysts to **quickly understand the financial implications of new information** and **make more informed, strategic decisions**.

---

### 🚀 Key Features  

- 📄 **Smart Document Upload:** Supports lengthy, complex documents such as legislation or financial filings.  
- ⚙️ **Automated AWS Pipeline:** Triggers cleaning, chunking, and multi-step analysis seamlessly via Step Functions.  
- 📊 **Impact & Risk Analysis:** Identifies at-risk sectors and provides reweighting recommendations.  
- 💬 **RAG Chatbot:** Query your reports and portfolios directly using natural language — not just a one-time report.  
- 🧾 **Executive Summaries:** Concise human-readable overviews highlighting key risks, metrics, and financial impacts.  

---

### 🧩 Tech Stack  

**Frontend:** Next.js  
**Backend:** Flask  
**Cloud & Infrastructure:**  
AWS Lambda · Amazon S3 · Step Functions · DynamoDB · Elastic Beanstalk · Amazon Bedrock (Models + Agent Core) · IAM · AWS Knowledge Bases  
*(Fully serverless and cloud-native architecture)*

---

### ⚙️ How It Works  

1. **File Upload**  
   - User uploads a document (e.g., SEC filing, legislation).  
   - Stored in **Amazon S3**, triggering a Lambda function.  

2. **Cleaning & Chunking**  
   - The Lambda normalizes and splits large files into smaller **chunks** for parallel processing.  

3. **Step Function Orchestration**  
   - A **state machine** coordinates five Lambda-based stages:  
     1. List document chunks.  
     2. Process each chunk in parallel via LLM to extract financial and regulatory features.  
     3. Aggregate chunk results into a comprehensive report.  
     4. Generate a filtered, concise summary.  
     5. Compare with **DynamoDB-stored portfolio data** to create recommendations.  

4. **Insight Generation**  
   - LLM refines outputs into readable narratives and actionable insights (e.g., risk factors, exposure advice).  

5. **Knowledge Base Integration**  
   - Final reports are automatically re-synced with an **AWS Knowledge Base**.  
   - A **RAG-powered chatbot** enables conversational analysis of your data (“Which companies are most affected by this policy?”).  

---

### 🧍‍♂️ Team  

**Vous faites partie de L’ÉQUIPE #28**, composée de:  
- **Alexander Meriakri** — Full Stack Development & Application Deployment  
- **Ayoub Khial** — Full Stack Development & Application Deployment  
- **Leroy Tiojip** — Assisted with RAG Retrieval and Documentation  
- **William Dunwoody** — AWS Infrastructure Lead (Lambdas, Step Functions, Buckets, DynamoDB, Knowledge Base, State Machine)

---

### 🏆 Hackathon Context  

Built during an **AWS-finance-focused datathon**, our solution stands out through:  
- A **fully AWS-native architecture**, integrating Bedrock Agents and Step Functions for robust automation.  
- A **dual analysis model**, providing both real-time insights **and** conversational RAG-based data exploration.

---

### 🌟 Future Improvements  

- 📈 **Interactive Visualization:** Implement dashboards and graphing to visualize risk trends and predictions.  
- ⚡ **Model Optimization:** Refine LLM prompt engineering and feature extraction for faster, more accurate financial interpretation.

---

### 🪄 Badges  

![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue?logo=nextdotjs)  
![Flask](https://img.shields.io/badge/Backend-Flask-lightgrey?logo=flask)  
![AWS](https://img.shields.io/badge/Cloud-AWS-orange?logo=amazonaws)  
![Hackathon](https://img.shields.io/badge/Built%20For-Datathon-success?logo=hackclub)  
![License](https://img.shields.io/badge/License-MIT-green)

---

> “S3-erpent — where financial insight meets intelligent automation.” 🐍  
> *Built with passion, teamwork, and way too many Lambda functions.*
