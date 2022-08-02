package ro.tuc.ds2020.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Cars {

    @Id
    private String id;

    @Column(name = "mark", nullable = false)
    private String mark;

    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="serviceName")
    private Services serviceName;

    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="userOwner")
    private Users userOwner;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "generation", nullable = false)
    private String generation;

    @Column(name = "fabricationDate", nullable = false)
    private String fabricationDate;

    @Column(name = "combustible", nullable = false)
    private Combustible combustible;

    @Column(name = "status", nullable = false)
    private CarStatuses status;

    @OneToMany(mappedBy = "car")
    private List<CarJob> jobs;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    private Reservation reservation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "problems_id", referencedColumnName = "id")
    private Problems problems;

    @Column(name = "totalPrice", nullable = false)
    private int totalPrice;

    public Cars() {
    }

    public Cars(String id, String mark, Services serviceName, Users userOwner, String model, String generation, String fabricationDate, Combustible combustible, CarStatuses status, List<CarJob> jobs, int totalPrice) {
        this.id = id;
        this.mark = mark;
        this.serviceName = serviceName;
        this.userOwner = userOwner;
        this.model = model;
        this.generation = generation;
        this.fabricationDate = fabricationDate;
        this.combustible = combustible;
        this.status = status;
        this.jobs = jobs;
        this.totalPrice = totalPrice;
    }

    public Cars(String id, String mark, Services serviceName, Users userOwner, String model, String generation, String fabricationDate, Combustible combustible,
                CarStatuses status, int totalPrice) {
        this.id = id;
        this.mark = mark;
        this.serviceName = serviceName;
        this.userOwner = userOwner;
        this.model = model;
        this.generation = generation;
        this.fabricationDate = fabricationDate;
        this.combustible = combustible;
        this.status = status;
        this.totalPrice = totalPrice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public Services getServiceName() {
        return serviceName;
    }

    public void setServiceName(Services serviceName) {
        this.serviceName = serviceName;
    }

    public Users getUserOwner() {
        return userOwner;
    }

    public void setUserOwner(Users userOwner) {
        this.userOwner = userOwner;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getGeneration() {
        return generation;
    }

    public void setGeneration(String generation) {
        this.generation = generation;
    }

    public String getFabricationDate() {
        return fabricationDate;
    }

    public void setFabricationDate(String fabricationDate) {
        this.fabricationDate = fabricationDate;
    }

    public Combustible getCombustible() {
        return combustible;
    }

    public void setCombustible(Combustible combustible) {
        this.combustible = combustible;
    }

    public CarStatuses getStatus() {
        return status;
    }

    public void setStatus(CarStatuses status) {
        this.status = status;
    }

    public List<CarJob> getJobs() {
        return jobs;
    }

    public void setJobs(List<CarJob> jobs) {
        this.jobs = jobs;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Problems getProblems() {
        return problems;
    }

    public void setProblems(Problems problems) {
        this.problems = problems;
    }
}
