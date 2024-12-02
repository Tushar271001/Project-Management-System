package com.maven.Controller;

import com.maven.Model.Mail;
import com.maven.Services.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {

    @Autowired
    private IMailService mailService;

    @PostMapping("/sendMail")
    public void addprojects(@RequestBody Mail mail){
        mailService.sendMail(mail);
    }
}
