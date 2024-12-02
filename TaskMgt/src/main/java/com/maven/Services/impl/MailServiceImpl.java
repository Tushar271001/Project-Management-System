package com.maven.Services.impl;

import com.maven.Model.Mail;

import com.maven.Services.IMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class MailServiceImpl implements IMailService {
//    @Autowired
//    private MailRepository mailRepository;
    static final String FROM="prajktagaikwad1114@gmail.com";

    @Autowired
    private JavaMailSender javaMailSender;



    @Override
    public void sendMail(Mail mail) {

        SimpleMailMessage s=new SimpleMailMessage();
        s.setFrom(FROM);
        s.setTo(mail.getTo());
        s.setSubject(mail.getSubject());
        s.setText(mail.getBody());
       // MimeMessage m=new MimeMessage();
        javaMailSender.send(s);
    }
}
