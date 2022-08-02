package ro.tuc.ds2020.dtos.builders;

import ro.tuc.ds2020.dtos.CarJobDTO;
import ro.tuc.ds2020.entities.CarJob;
import ro.tuc.ds2020.entities.Cars;

public class CarJobBuilder {

    public static CarJob toEntity(CarJobDTO carJobDTO, Cars car) {
        return new CarJob(carJobDTO.getId(), carJobDTO.getName(), carJobDTO.getDescription(),
                carJobDTO.getPrice(), carJobDTO.getDuration(), car);

    }

    public static CarJobDTO toCarJobDTO(CarJob carJob) {
        return new CarJobDTO(carJob.getId(), carJob.getName(), carJob.getDescription(),
                carJob.getPrice(), carJob.getCar().getId(), carJob.getDuration());

    }
}
