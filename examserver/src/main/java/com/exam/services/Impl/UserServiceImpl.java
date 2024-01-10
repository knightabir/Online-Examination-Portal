package com.exam.services.Impl;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

/**
 * Service implementation class for managing user-related operations.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    /**
     * Creates a new user with the specified information.
     *
     * @param user      The user object to be created.
     * @param userRoles The set of user roles associated with the user.
     * @return The created user.
     * @throws Exception If there is an issue creating the user.
     */
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local = this.userRepository.findByUsername(user.getUsername());

        if (local != null) {
            System.out.println("User is already there!!");
            throw new Exception("User already Present!!");
        } else {
            // Create the user
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }

        return local;
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username The username of the user to be retrieved.
     * @return The user with the specified username.
     */
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    /**
     * Deletes a user by their user ID.
     *
     * @param userId The ID of the user to be deleted.
     */
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    /**
     * Updates the information of an existing user.
     *
     * @param userId     The ID of the user to be updated.
     * @param updateUser The updated user object.
     * @return The updated user.
     * @throws Exception If there is an issue updating the user.
     */
    @Override
    public User updateUser(Long userId, User updateUser) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            // Update the user information
            existingUser.setUsername(updateUser.getUsername());
            existingUser.setFirstName(updateUser.getFirstName());
            existingUser.setLastName(updateUser.getLastName());
            existingUser.setEmail(updateUser.getEmail());
            existingUser.setPhone(updateUser.getPhone());
            existingUser.setUserRoles(updateUser.getUserRoles());
            existingUser.setProfile(updateUser.getProfile());
            existingUser.setPassword(updateUser.getPassword());

            // Save the updated user back to the database
            userRepository.save(existingUser);
        } else {
            throw new Exception("User not found with id: " + userId);
        }

        // Return the updated user
        return optionalUser.get();
    }

    /**
     * Retrieves a user by their user ID.
     *
     * @param userId The ID of the user to be retrieved.
     * @return The user with the specified ID.
     */
    @Override
    public User getUserById(Long userId) {
        return this.userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }
}
