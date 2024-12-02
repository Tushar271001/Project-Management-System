package com.maven.Services.impl;

import com.maven.Model.AdminGroups;
import com.maven.Model.MyUser;
import com.maven.Model.Role;
import com.maven.Repository.IAdminGroupsRepository;
import com.maven.Repository.IRoleRepository;
import com.maven.Repository.IUserRepository;
import com.maven.Services.IUserService;
import com.maven.Model.dtos.UserDto;
import com.maven.exception.InvalidCredentialsException;
import com.maven.exception.ResourceNotFoundException;
import com.maven.exception.UserNameAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private IAdminGroupsRepository groupsRepository;
    @Override
    public MyUser addUser(MyUser user) throws UserNameAlreadyExistsException {
        user.setDate(LocalDate.now().toString());

        if(userRepository.findByEmail(user.getEmail()).isEmpty()){
            return userRepository.save(user);
        }else{
            return null;
        }

    }

    @Override
    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public MyUser login(MyUser user) throws InvalidCredentialsException {
        MyUser loggedUser= userRepository.getUserByEmailAndPassword(user.getEmail(),user.getPassword());

        if(loggedUser!=null){
            return loggedUser;
        }
        else {
            return null;
        }
    }

    @Override
    public List<UserDto> getAllUser() {

        List<UserDto> users=new ArrayList<>();

        userRepository.findAll().forEach(user -> {
             UserDto userDto=new UserDto();

             userDto.setId(user.getId());
             userDto.setFirstName(user.getFirstName());
             userDto.setLastName(user.getLastName());
             userDto.setContact(user.getContact());
             userDto.setDate(user.getDate());
             userDto.setEmail(user.getEmail());
             userDto.setImage(user.getImage());
             AdminGroups adminGroups =groupsRepository.findById(user.getAdminGroups().getId()).get();
             userDto.setGroupName(adminGroups.getGroup_name());

             users.add(userDto);
        });

        return users;
    }

    @Override
    public MyUser updateUser(MyUser user) throws ResourceNotFoundException {
        MyUser existedUser=userRepository.findById(user.getId()).orElseThrow(()->new ResourceNotFoundException("User not present"));

        existedUser.setFirstName(user.getFirstName());
        existedUser.setLastName(user.getLastName());
        existedUser.setContact(user.getContact());
        user.setEmail(user.getEmail());
        existedUser.setPassword(user.getPassword());
        existedUser.setImage(user.getImage());
        existedUser.setAdminGroups(user.getAdminGroups());
        existedUser.setStatus(user.getStatus());
        existedUser.setDate(user.getDate());

        return userRepository.save(user);
    }

    @Override
    public String deleteUser(Long userId) {
        userRepository.deleteById(userId);

        if(userRepository.findById(userId).isEmpty()){
            return "User deleted";
        }
        else {
            return "User not deleted";
        }
    }
}
