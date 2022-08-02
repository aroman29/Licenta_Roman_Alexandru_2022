package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.ReservationDTO;
import ro.tuc.ds2020.dtos.ServicesDTO;
import ro.tuc.ds2020.entities.Reservation;
import ro.tuc.ds2020.entities.Services;

public class ReservationBuilder {

    public ReservationBuilder() {
    }

    public static ReservationDTO toReservationDTO(Reservation reservation){
        return new ReservationDTO(reservation.getId(), reservation.getCar().getServiceName().getId(), reservation.getCar().getUserOwner().getId(), reservation.getResDate());
    }

//    public static Services toEntityFromReservationDTO(ServicesDTO servicesDTO){
//        return new Services(servicesDTO.getId(),
//                servicesDTO.getAddress(),
//                servicesDTO.getCity(),
//                servicesDTO.isOpen(),
//                servicesDTO.getLat(),
//                servicesDTO.getLng(),
//                servicesDTO.getReservationLimit());
//    }
}
