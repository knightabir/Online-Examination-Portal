package com.exam.controller;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Controller class for handling user-related operations.
 */
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/")
    public String test(){
        return "Welcome to backend api of Exam-portal";
    }

    /**
     * Endpoint to create a new user.
     *
     * @param user The user object to be created.
     * @return The created user.
     * @throws Exception If there is an issue creating the user.
     */
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

        user.setProfile("default.png");
        //Encoding password with Bcrypt Password Encoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));


        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);

        roles.add(userRole);

        return this.userService.createUser(user,roles);
    }

    /**
     * Endpoint to find a user by username.
     *
     * @param username The username of the user to be retrieved.
     * @return The user with the specified username.
     */
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) {
        return this.userService.getUser(username);
    }

    /**
     * Endpoint to find a user by userId.
     *
     * @param userId The ID of the user to be retrieved.
     * @return The user with the specified ID.
     */
    @GetMapping("/id/{userId}")
    public User getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserById(userId);
    }

    /**
     * Endpoint to delete a user by userId.
     *
     * @param userId The ID of the user to be deleted.
     */
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        this.userService.deleteUser(userId);
    }

    /**
     * Endpoint to update a user by userId.
     *
     * @param userId      The ID of the user to be updated.
     * @param updateUser  The updated user object.
     * @return The updated user.
     * @throws Exception If there is an issue updating the user.
     */
    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User updateUser) throws Exception {
        return userService.updateUser(userId, updateUser);
    }

}
