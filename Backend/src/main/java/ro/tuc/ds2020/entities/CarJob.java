package ro.tuc.ds2020.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarJob {

    @Id
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "duration", nullable = false)
    private String duration;

    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="car")
    private Cars car;

    public CarJob(String id, String name, String description, int price, String duration, Cars car) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.duration = duration;
        this.car = car;
    }
}
