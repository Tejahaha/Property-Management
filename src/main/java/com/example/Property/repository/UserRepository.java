package com.example.Property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.Property.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    @Query("select count(U) from User U where U.email=:email and U.password=:password")
    public int validateCredentials(@RequestParam("email") String email, @RequestParam("password") String password);

}
