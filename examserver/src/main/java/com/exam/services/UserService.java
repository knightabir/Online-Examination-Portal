package com.exam.services;
import com.exam.entity.User;
import com.exam.entity.UserRole;

import java.util.Set;

/**
 * Service interface for managing user-related operations.
 */
public interface UserService {

    /**
     * Creates a new user with the specified information.
     *
     * @param user      The user object to be created.
     * @param userRoles The set of user roles associated with the user.
     * @return The created user.
     * @throws Exception If there is an issue creating the user.
     */
    User createUser(User user, Set<UserRole> userRoles) throws Exception;

    /**
     * Retrieves a user by their username.
     *
     * @param username The username of the user to be retrieved.
     * @return The user with the specified username.
     */
    User getUser(String username);

    /**
     * Deletes a user by their user ID.
     *
     * @param userId The ID of the user to be deleted.
     */
    void deleteUser(Long userId);

    /**
     * Updates the information of an existing user.
     *
     * @param userId     The ID of the user to be updated.
     * @param updateUser The updated user object.
     * @return The updated user.
     * @throws Exception If there is an issue updating the user.
     */
    User updateUser(Long userId, User updateUser) throws Exception;

    /**
     * Retrieves a user by their user ID.
     *
     * @param userId The ID of the user to be retrieved.
     * @return The user with the specified ID.
     */
    User getUserById(Long userId);
}
