package com.maven.Services.impl;

import com.maven.Model.MyUser;
import com.maven.Repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MyUser user =userRepository.findByEmail(username).orElseThrow(
                ()->new UsernameNotFoundException("User is not present with this email!"));

        List<GrantedAuthority> authorities=List.of(new SimpleGrantedAuthority("ROLE_"+user.getRole()));

        return new User(user.getEmail(),user.getPassword(),authorities);
    }
}