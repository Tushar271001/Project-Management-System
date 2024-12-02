package com.maven.exception;

public class UserNameAlreadyExistsException extends Exception{
    public UserNameAlreadyExistsException(String message) {
        super(message);
    }
}
