package ro.tuc.ds2020.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Services {

    @Id
    private String id;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "lat", nullable = false)
    private String lat;

    @Column(name = "lng", nullable = false)
    private String lng;

    @Column(name = "open", nullable = false)
    private boolean open;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "reservationLimit", nullable = true)
    private int reservationLimit;

    @OneToMany(mappedBy = "serviceName")
    private List<Cars> cars;

    @OneToMany(mappedBy = "services")
    private List<CustomReservationLimit> customReservations;

    @OneToMany(mappedBy = "serviceAssigned")
    private List<Users> staffAssigned;

//    @OneToMany(mappedBy = "workingService")
//    private List<Worker> workers;

    public Services() {
    }

    public Services(String id, String address, String city, boolean open, List<Cars> cars, String lat, String lng, boolean active, int reservationLimit) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.open = open;
        this.cars = cars;
        this.lat = lat;
        this.lng = lng;
        this.active = active;
        this.reservationLimit = reservationLimit;
    }
    public Services(String id, String address, String city, boolean open,  String lat, String lng, int reservationLimit) {
        this.id = id;
        this.address = address;
        this.city = city;
        this.open = open;
        this.lat = lat;
        this.lng = lng;
        this.reservationLimit = reservationLimit;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public List<Cars> getCars() {
        return cars;
    }

    public void setCars(List<Cars> cars) {
        this.cars = cars;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getReservationLimit() {
        return reservationLimit;
    }

    public void setReservationLimit(int reservationLimit) {
        this.reservationLimit = reservationLimit;
    }
}
