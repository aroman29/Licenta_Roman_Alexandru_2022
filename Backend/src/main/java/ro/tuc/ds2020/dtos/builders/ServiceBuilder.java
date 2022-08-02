package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.ServicesDTO;
import ro.tuc.ds2020.entities.Services;

public class ServiceBuilder {

    public ServiceBuilder() {
    }

    public static ServicesDTO toServiceDTO(Services service){
        return new ServicesDTO(service.getId(),
                service.getAddress(),
                service.getCity(),
                service.isOpen(),
                service.getLat(),
                service.getLng(),
                service.getReservationLimit());
    }

    public static Services toEntity(ServicesDTO servicesDTO){
        return new Services(servicesDTO.getId(),
                servicesDTO.getAddress(),
                servicesDTO.getCity(),
                servicesDTO.isOpen(),
                servicesDTO.getLat(),
                servicesDTO.getLng(),
                servicesDTO.getReservationLimit());
    }
}
