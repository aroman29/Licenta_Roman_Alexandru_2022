package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.CustomReservationLimitDTO;
import ro.tuc.ds2020.dtos.ServicesDTO;
import ro.tuc.ds2020.entities.CustomReservationLimit;
import ro.tuc.ds2020.entities.Services;

public class CustomReservationLimitBuilder {

    public CustomReservationLimitBuilder() {
    }

    public static CustomReservationLimitDTO toCustomReservationLimitDTO(CustomReservationLimit customReservationLimit){
        return new CustomReservationLimitDTO(customReservationLimit.getId(),
                customReservationLimit.getServices().getId(),
                customReservationLimit.getReservationLimit(),
                customReservationLimit.getDate(),
                customReservationLimit.isActive()
        );
    }

    public static CustomReservationLimit toEntity(CustomReservationLimitDTO customReservationLimitDTO, Services service){
        return new CustomReservationLimit(customReservationLimitDTO.getId(),
                customReservationLimitDTO.getReservationLimit(),
                customReservationLimitDTO.getDate(),
                service,
                customReservationLimitDTO.isActive()
        );
    }
}
