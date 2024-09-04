import ConsoleManager from '../logs/ConsoleManager';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

declare global {
    var emailManager: EmailManager;
}

export default class EmailManager {
    public transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.eu.mailgun.org',
            port: 587,
            secure: false,
            auth: {
                user: 'postmaster@orleansmc.com',
                pass: process.env.MAILGUN_PASSWORD
            },
        });
    }

    public static getInstance(): EmailManager {
        if (!global.emailManager) {
            global.emailManager = new EmailManager();
        }

        return global.emailManager;
    }

    public async sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void> {
        if (!text && !html) {
            throw new Error('You must provide either text or html for the email');
        }

        const response = await this.transporter.sendMail(
            {
                from: 'OrleansMC <do_not_reply@orleansmc.com>',
                to: to,
                subject: subject,
                text: text!,
                html: html!
            });

        if (response.accepted.length === 0) {
            ConsoleManager.error('Email Manager', `Error sending email to ${to}: Email not accepted`);
            return;
        }

        ConsoleManager.log(`Email Manager`, `Email sent to ${to} with subject ${subject}`);
    }
}