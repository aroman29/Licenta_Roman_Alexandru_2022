package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ro.tuc.ds2020.entities.CarJob;
import ro.tuc.ds2020.entities.CarStatuses;

public interface CarJobRepository  extends JpaRepository<CarJob, String> {

    public void deleteById(String id);

    @Modifying
    @Query("update CarJob c set " +
            "c.active = false " +
            "where c.id = :id")
    int deleteByActive(@Param("id") String id
    );
}
