package com.maven.Services;

import com.maven.Model.Mail;
import org.springframework.stereotype.Service;


public interface IMailService {
    void sendMail(Mail mail);
}
