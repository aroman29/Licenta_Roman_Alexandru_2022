package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.tuc.ds2020.entities.Messages;
import ro.tuc.ds2020.entities.Users;

public interface MessagesRepository  extends JpaRepository<Messages, String> {

    @Modifying
    @Query("update Messages m set " +
            "m.seen = true " +
            "where m.id = :id")
    int editSeenMessage(@Param("id") String id);

    @Modifying
    @Query("update Messages m set " +
            "m.active = false " +
            "where m.id = :id")
    int deleteMessageByBoolean(@Param("id") String id
    );


}
