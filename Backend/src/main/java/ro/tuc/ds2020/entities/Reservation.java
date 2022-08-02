package ro.tuc.ds2020.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Reservation {

    @Id
    private String id;

    @Column(name = "resDate", nullable = true)
    private LocalDate resDate;

    @OneToOne(mappedBy = "reservation")
    private Cars car;

    @Override
    public String toString() {
        return "Reservation{" +
                "id='" + id + '\'' +
                ", resDate=" + resDate +
                ", car=" + car +
                '}';
    }
}
