// utils/sendEmail.js
// да махна nodemailer!!!
import { config } from "../config/config.js";

export async function sendEmail(to, subject, html) {
    console.log("🔹 Brevo sender:", config.brevo.sender);
    console.log("🔹 Brevo API key length:", config.brevo.apiKey?.length);

    const body = {
        sender: { name: "RecipeBook", email: config.brevo.sender },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html
    };

    try {
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": config.brevo.apiKey
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Brevo API error: ${res.status} ${errText}`);
        }

        console.log(`✅ Email изпратен успешно до: ${to}`);
    } catch (err) {
        console.error("Send email error:", err);
        throw err; // важно да хвърлим грешката, за да се улови в контролера
    }
}