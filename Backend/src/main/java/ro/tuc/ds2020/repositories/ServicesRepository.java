package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.tuc.ds2020.entities.Services;

public interface ServicesRepository extends JpaRepository<Services, String> {


    @Modifying
    @Query("update Services s set " +
            "s.address = :address, " +
            "s.city = :city, " +
            "s.lat = :lat, " +
            "s.lng = :lng, " +
            "s.reservationLimit = :reservationLimit " +
            "where s.id = :id")
    int editServices(@Param("id") String id,
                       @Param("address") String address,
                       @Param("city") String city,
                       @Param("lat") String lat,
                       @Param("lng") String lng,
                       @Param("reservationLimit") int reservationLimit
    );

    @Modifying
    @Query("update Services s set " +
            "s.reservationLimit = :reservationLimit " +
            "where s.id = :id")
    int editReservationLimit(@Param("id") String id,
                     @Param("reservationLimit") int reservationLimit
    );

    @Modifying
    @Query("update Services s set " +
            "s.active = false " +
            "where s.id = :id")
    int deactivateService(@Param("id") String id
    );

}
