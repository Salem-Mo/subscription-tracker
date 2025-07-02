# Subscription Tracker API

A robust and secure backend application for managing subscriptions, built with modern technologies and best security practices.

---

## 🚀 Features

- **RESTful API** for subscription management
- **User authentication & authorization**
- **Comprehensive error handling**
- **Rate limiting & request validation**
- **SQL Injection protection**
- **DDoS/DoS mitigation**
- **Extensive logging**

---

## 🛡️ Security Highlights

### 1. DoS & DDoS Protection

- **Arcjet:** Advanced protection against DoS/DDoS attacks and abuse.
- **Rate Limiting:** Restricts the number of requests per IP to prevent abuse.
- **HTTP Headers Hardening:** Uses `helmet` to secure HTTP headers.
- **Request Size Limiting:** Prevents large payload attacks.
- **Timeouts:** Ensures slow requests are dropped.

### 2. SQL Injection Prevention

- **Parameterized Queries:** All database queries use parameterized statements.
- **Input Validation & Sanitization:** All user inputs are validated and sanitized.

---

## 🛠️ Technologies Used

- **Node.js** & **Express.js** – Core backend framework
- **Upstash** – Managed Redis for caching and rate limiting
- **Arcjet** – Security and abuse prevention
- **Nodemailer** – Email notifications
- **JWT** – Authentication
- **Helmet** – Security headers
- **Joi** – Input validation
- **Winston/Morgan** – Logging

---

## 📦 Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Salem-Mo/subscription-tracker.git
    
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables in `.env` file.

4. Start the server:
    ```bash
    npm start

    npm run dev -> in development
    ```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## 📝 License

Holy Salem.LLC
