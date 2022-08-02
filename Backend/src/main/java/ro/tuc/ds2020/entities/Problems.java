package ro.tuc.ds2020.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Problems {

    @Id
    private String id;

    @Column(name = "oil_change", nullable = false)
    private boolean option0;

    @Column(name = "tire_change", nullable = false)
    private boolean option1;

    @Column(name = "wheel_alignment", nullable = false)
    private boolean option2;

    @Column(name = "change_breaks", nullable = false)
    private boolean option3;

    @Column(name = "ac_problems", nullable = false)
    private boolean option4;

    @Column(name = "car_check", nullable = false)
    private boolean option5;

    @Column(name = "notes", length = 2500, nullable = false)
    private String notes;

    @OneToOne(mappedBy = "problems")
    private Cars car;
}
