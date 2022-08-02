package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.tuc.ds2020.dtos.CustomReservationLimitDTO;
import ro.tuc.ds2020.dtos.ReservationLimitDTO;
import ro.tuc.ds2020.dtos.builders.CustomReservationLimitBuilder;
import ro.tuc.ds2020.dtos.builders.ServiceBuilder;
import ro.tuc.ds2020.dtos.ServicesDTO;
import ro.tuc.ds2020.entities.CustomReservationLimit;
import ro.tuc.ds2020.entities.Services;
import ro.tuc.ds2020.repositories.CarsRepository;
import ro.tuc.ds2020.repositories.CustomReservationLimitRepository;
import ro.tuc.ds2020.repositories.ServicesRepository;
import ro.tuc.ds2020.repositories.UsersRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ServicesService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ServicesService.class);
    private final ServicesRepository servicesRepository;
    private final CustomReservationLimitRepository customReservationLimitRepository;
    private final UsersRepository usersRepository;
    private final CarsRepository carsRepository;

    @Autowired
    public ServicesService(ServicesRepository servicesRepository, CustomReservationLimitRepository customReservationLimitRepository,
                           UsersRepository usersRepository,CarsRepository carsRepository
    ) {
        this.servicesRepository = servicesRepository;
        this.customReservationLimitRepository = customReservationLimitRepository;
        this.usersRepository = usersRepository;
        this.carsRepository = carsRepository;
    }

    public List<ServicesDTO> findServices() {
        List<Services> servicesList = servicesRepository.findAll();
        List<ServicesDTO> dtos = new ArrayList<ServicesDTO>();
        for (Services s: servicesList
             ) {
            if(s.isActive()){
                dtos.add(ServiceBuilder.toServiceDTO(s));
            }
        }
        return dtos;
    }

    public int findReservationLimitByServiceIdAndDate(String serviceId, String date) {
        Optional <Services> service = servicesRepository.findById(serviceId);
        int limit = service.get().getReservationLimit();
        List<CustomReservationLimit> customReservationLimitList = customReservationLimitRepository.findAll();

        for (CustomReservationLimit c: customReservationLimitList
             ) {
//            System.out.println();
            System.out.println(c.getDate().toString().substring(0, 10) + ":" + date.substring(0, 10) + "  -  " + c.getServices().getId() + ":" + serviceId);
            if (c.getDate().toString().substring(0, 10).equals(date.substring(0, 10)) && c.getServices().getId().equals(serviceId)) {
                limit = c.getReservationLimit();
            }
//            System.out.println(c.getDate().toString().substring(0, 10) + " - " + date.substring(1, 11) + ";    " + c.getServices().getId() +" - " + serviceId + " -> " + limit;
        }

        return limit;

    }

    public List<CustomReservationLimitDTO> findReservationLimitsByServiceId(String serviceId) {

        List<CustomReservationLimit> customReservationLimitList = customReservationLimitRepository.findAll();
        List<CustomReservationLimitDTO> dtos = new ArrayList<>();
        for (CustomReservationLimit c: customReservationLimitList
        ) {
            if (c.getServices().getId().equals(serviceId)) {
                dtos.add(CustomReservationLimitBuilder.toCustomReservationLimitDTO(c));
            }
        }
        return dtos;

    }

    public ServicesDTO findServicesById(String id) {
        Optional<Services> service = servicesRepository.findById(id);
        if(service.get().isActive())
            return ServiceBuilder.toServiceDTO(service.get());
        return ServiceBuilder.toServiceDTO(service.get());
    }

    public String insert(ServicesDTO servicesDTO) {
        Services service = ServiceBuilder.toEntity(servicesDTO);
        service.setOpen(true);
        service.setActive(true);
        service.setId(UUID.randomUUID().toString());
        service = servicesRepository.save(service);

        LOGGER.debug("Person with id {} was inserted in db", service.getId());
        return service.getId();
    }

    @Transactional
    public ServicesDTO updateService(ServicesDTO servicesDTO, String id){

        servicesRepository.editServices(id, servicesDTO.getAddress(), servicesDTO.getCity(), servicesDTO.getLat(), servicesDTO.getLng(), servicesDTO.getReservationLimit());
        Optional<Services> updated = servicesRepository.findById(id);
        ServicesDTO dto = ServiceBuilder.toServiceDTO(updated.get());

        return dto;
    }

    @Transactional
    public ServicesDTO updateReservationLimit(ReservationLimitDTO reservationLimitDTO, String id){

        servicesRepository.editReservationLimit(id, reservationLimitDTO.getReservationLimit());
        Optional<Services> updated = servicesRepository.findById(id);
        ServicesDTO dto = ServiceBuilder.toServiceDTO(updated.get());

        return dto;
    }
    @Transactional
    public ServicesDTO deleteService(String id){

        servicesRepository.deactivateService(id);
        Optional<Services> updated = servicesRepository.findById(id);
        updated.get().setActive(false);
        ServicesDTO dto = ServiceBuilder.toServiceDTO(updated.get());


        return dto;
    }

}
