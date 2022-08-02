package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.CarJobDTO;
import ro.tuc.ds2020.dtos.ServicesDTO;
import ro.tuc.ds2020.dtos.builders.CarJobBuilder;
import ro.tuc.ds2020.dtos.builders.ServiceBuilder;
import ro.tuc.ds2020.entities.CarJob;
import ro.tuc.ds2020.entities.Cars;
import ro.tuc.ds2020.repositories.CarJobRepository;
import ro.tuc.ds2020.repositories.CarsRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CarJobService {


    private static final Logger LOGGER = LoggerFactory.getLogger(CarJob.class);
    private final CarJobRepository carJobRepository;
    private final CarsRepository carsRepository;

    @Autowired
    public CarJobService(CarJobRepository carJobRepository,
                         CarsRepository carsRepository) {
        this.carJobRepository = carJobRepository;
        this.carsRepository = carsRepository;
    }

    public CarJobDTO findBarJobById(String id) {
        Optional<CarJob> carJob = carJobRepository.findById(id);
        return CarJobBuilder.toCarJobDTO(carJob.get());
    }

    public List<CarJobDTO> findAllCarJobs() {
        List<CarJob> carJobsList = carJobRepository.findAll();
        return carJobsList.stream().filter(c -> c.isActive() == true)
                .map(CarJobBuilder::toCarJobDTO)
                .collect(Collectors.toList());
    }

    public String insert(CarJobDTO carJobDTO, String id) {
        Optional<Cars> car = carsRepository.findById(id);
        CarJob carJob = CarJobBuilder.toEntity(carJobDTO, car.get());
        carJob.setId(UUID.randomUUID().toString());
        carJob = carJobRepository.save(carJob);

        LOGGER.debug("Car job with id {} was inserted in db", carJob.getId());
        return carJob.getId();
    }

    public String insert(CarJobDTO carJobDTO) {
        System.out.println(carJobDTO.getId() + " " + carJobDTO.getName() + " " +  carJobDTO.getCarId());
        Optional<Cars> car = carsRepository.findById(carJobDTO.getCarId());
        CarJob carJob = CarJobBuilder.toEntity(carJobDTO, car.get());
        carJob.setId(UUID.randomUUID().toString());
        carJob.setActive(true);
        carJob = carJobRepository.save(carJob);

        LOGGER.debug("Car job with id {} was inserted in db", carJob.getId());
        return carJob.getId();
    }

    @Transactional
    public String delete(CarJobDTO carJobDTO) {
        carJobRepository.deleteByActive(carJobDTO.getId());

        LOGGER.debug("Car job deleted");
        return carJobDTO.getId();
    }


}
