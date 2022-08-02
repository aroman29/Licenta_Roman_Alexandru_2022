package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.UsersDTO;
import ro.tuc.ds2020.entities.Users;

public class UsersBuilder {

    private UsersBuilder() {
    }

    public static UsersDTO toUsersDTO(Users users, String serviceId) {
        return new UsersDTO(users.getId(), users.getLastName(), users.getFirstName(), users.getEmail(),
                users.getPassword(), users.getPhone(), users.getRole(), users.isActive(), serviceId);
    }

    public static UsersDTO toUsersDTO(Users users) {
        return new UsersDTO(users.getId(), users.getLastName(), users.getFirstName(), users.getEmail(),
                users.getPassword(), users.getPhone(), users.getRole(), users.isActive());
    }

    public static Users toEntity(UsersDTO usersDTO) {
        return new Users(usersDTO.getId(),
                usersDTO.getFirstName(),
                usersDTO.getLastName(),
                usersDTO.getEmail(),
                usersDTO.getPassword(),
                usersDTO.isActive(),
                usersDTO.getPhone(),
                usersDTO.getRole()
                );
    }

    public static Users toNewEntity(UsersDTO usersDTO) {
        return new Users(
                usersDTO.getFirstName(),
                usersDTO.getLastName(),
                usersDTO.getEmail(),
                usersDTO.getPassword(),
                usersDTO.isActive(),
                usersDTO.getPhone(),
                usersDTO.getRole()
        );
    }
}
