package com.evproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // ================= SIMPLE TEXT EMAIL =================
//    public void sendAlertEmail(String toEmail, String subject, String body) {
//
//        try {
//            SimpleMailMessage message = new SimpleMailMessage();
//            message.setTo(toEmail);
//            message.setSubject(subject);
//            message.setText(body);
//
//            mailSender.send(message);
//
//            System.out.println("✅ Simple Email Sent!");
//
//        } catch (Exception e) {
//            System.out.println("❌ Simple Email Failed: " + e.getMessage());
//        }
//    }

    // ================= HTML EMAIL (ADVANCED 🔥) =================
    public void sendHtmlEmail(String toEmail, String subject, String htmlBody) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // ✅ Enable HTML

            mailSender.send(message);

            System.out.println("✅ HTML Email Sent!");

        } catch (Exception e) {
            System.out.println("❌ HTML Email Failed: " + e.getMessage());
        }
    }
}