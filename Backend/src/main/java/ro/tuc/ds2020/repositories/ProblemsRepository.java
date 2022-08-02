package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.tuc.ds2020.entities.Problems;

public interface ProblemsRepository extends JpaRepository<Problems, String> {
}
