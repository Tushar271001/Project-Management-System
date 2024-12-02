package com.maven.Repository;

import com.maven.Model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<MyUser,Long> {
    MyUser getUserByEmailAndPassword(String email,String password);

    Optional<MyUser> findByEmail(String email);
}
