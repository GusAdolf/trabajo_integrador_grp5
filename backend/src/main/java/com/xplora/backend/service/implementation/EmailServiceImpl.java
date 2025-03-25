package com.xplora.backend.service.implementation;

import com.xplora.backend.entity.User;
import com.xplora.backend.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.springframework.core.io.Resource;

@Service
public class EmailServiceImpl implements IEmailService {
    private final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("classpath:templates/xplora-logo.png")
    private Resource resourceFile;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void sendMailWelcome(User user) throws MessagingException {
        logger.info("sendMailWelcome - Enviando correo de registro/bienvenida al usuario con id: " + user.getId());
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(user.getEmail());
        helper.setSubject("Bienvenido/a a Xplora+");

        Context context = new Context();
        context.setVariable("firstname", user.getFirstname());
        String contentHTML = templateEngine.process("email-welcome", context);

        helper.setText(contentHTML, true);
        helper.addInline("attachment.png", resourceFile);

        javaMailSender.send(message);
    }
}
