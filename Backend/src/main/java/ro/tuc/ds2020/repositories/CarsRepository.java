package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.tuc.ds2020.entities.CarStatuses;
import ro.tuc.ds2020.entities.Cars;
import ro.tuc.ds2020.entities.Users;

public interface CarsRepository extends JpaRepository<Cars, String> {

    @Modifying
    @Query("update Cars c set " +
            "c.status = :status " +
            "where c.id = :id")
    int editCars(@Param("id") String id,
                     @Param("status") CarStatuses status
    );

}
