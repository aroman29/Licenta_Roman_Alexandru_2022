package ro.tuc.ds2020.dtos;

import ro.tuc.ds2020.entities.CarStatuses;
import ro.tuc.ds2020.entities.Combustible;

public class CarsInsertDTO {

    private String id;
    private String mark;
    private String serviceName;
    private String userOwner;
    private String model;
    private String generation;
    private String fabricationDate;
    private Combustible combustible;
    private CarStatuses status;
    private int totalPrice;

    public CarsInsertDTO(String id, String mark, String serviceName, String userOwner, String model,
                         String generation, String fabricationDate, Combustible combustible,
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

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getUserOwner() {
        return userOwner;
    }

    public void setUserOwner(String userOwner) {
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

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}
