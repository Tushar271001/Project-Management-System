package com.maven.Services;

import com.maven.Model.MyUser;
import com.maven.Model.Role;
import com.maven.Model.dtos.UserDto;
import com.maven.exception.InvalidCredentialsException;
import com.maven.exception.ResourceNotFoundException;
import com.maven.exception.UserNameAlreadyExistsException;

import java.util.List;
public interface IUserService {
    MyUser addUser(MyUser user) throws UserNameAlreadyExistsException;

    Role addRole(Role role);

    MyUser login(MyUser user) throws InvalidCredentialsException;

    List<UserDto> getAllUser();

    MyUser updateUser(MyUser user) throws ResourceNotFoundException;

    String deleteUser(Long userId);

}
