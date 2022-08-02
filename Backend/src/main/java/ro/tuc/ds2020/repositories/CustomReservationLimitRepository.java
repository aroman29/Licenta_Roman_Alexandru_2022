package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.tuc.ds2020.entities.Cars;
import ro.tuc.ds2020.entities.CustomReservationLimit;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface CustomReservationLimitRepository extends JpaRepository<CustomReservationLimit, String> {

    Optional<CustomReservationLimit> findByDate(Date date);

    @Modifying
    @Query("update CustomReservationLimit c set " +
            "c.reservationLimit = :reservationLimit " +
            "where c.id = :id")
    int changeReservationLimitById(@Param("id") String id,
                             @Param("reservationLimit") int reservationLimit
    );
}
