package com.evproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.evproject.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}