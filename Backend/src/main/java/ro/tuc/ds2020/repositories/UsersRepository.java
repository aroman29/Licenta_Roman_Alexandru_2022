package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.tuc.ds2020.entities.CarStatuses;
import ro.tuc.ds2020.entities.Users;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, String> {

    Optional<Users> findByEmail(String email);

    @Modifying
    @Query("update Users u set " +
            "u.active = false " +
            "where u.id = :id")
    int deleteEditUser(@Param("id") String id);
}
