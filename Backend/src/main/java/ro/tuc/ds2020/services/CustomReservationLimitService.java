package ro.tuc.ds2020.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.dtos.CustomReservationLimitDTO;
import ro.tuc.ds2020.dtos.CustomReservationLimitWeekDTO;
import ro.tuc.ds2020.dtos.builders.CustomReservationLimitBuilder;
import ro.tuc.ds2020.entities.CustomReservationLimit;
import ro.tuc.ds2020.entities.Services;
import ro.tuc.ds2020.repositories.*;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CustomReservationLimitService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarsService.class);
    private final CustomReservationLimitRepository customReservationLimitRepository;
    private final ServicesRepository servicesRepository;


    @Autowired
    public CustomReservationLimitService(CustomReservationLimitRepository customReservationLimitRepository,
                       ServicesRepository servicesRepository
    ) {
        this.customReservationLimitRepository = customReservationLimitRepository;
        this.servicesRepository = servicesRepository;
    }

    public List<CustomReservationLimitDTO> findCustomReservationLimits() {
        List<CustomReservationLimit> customReservationLimitList = customReservationLimitRepository.findAll();
        List<CustomReservationLimitDTO> dtos = new ArrayList<CustomReservationLimitDTO>();
        for (CustomReservationLimit c: customReservationLimitList
             ) {
            if(c.isActive()){
                dtos.add(CustomReservationLimitBuilder.toCustomReservationLimitDTO(c));
            }
        }
        return dtos;
    }

    public CustomReservationLimitDTO findCustomReservationLimitById(String id) {
        Optional<CustomReservationLimit> customReservationLimit = customReservationLimitRepository.findById(id);
        return CustomReservationLimitBuilder.toCustomReservationLimitDTO(customReservationLimit.get());
    }

    public String insert(CustomReservationLimitWeekDTO customReservationLimitWeekDTO) {

        List<CustomReservationLimitDTO> customReservationLimitListDTO = new ArrayList<>(0);
        for (int i = 0; i < 7; i++) {
            customReservationLimitListDTO.add(new CustomReservationLimitDTO(UUID.randomUUID().toString(),
                    customReservationLimitWeekDTO.getServiceId(),
                    customReservationLimitWeekDTO.getReservationLimit(),
                    customReservationLimitWeekDTO.getDays().get(i),
                    true
            ));
        }

        for (CustomReservationLimitDTO c: customReservationLimitListDTO
        ) {
            Optional<Services> service = servicesRepository.findById(c.getServiceId());
            Optional <CustomReservationLimit> foundDate = customReservationLimitRepository.findByDate(c.getDate());
            if(!foundDate.isPresent()) {
                CustomReservationLimit customReservationLimit = CustomReservationLimitBuilder.toEntity(c, service.get());
                customReservationLimitRepository.save(customReservationLimit);
            } else {
                updateCustomReservationLimit(foundDate.get().getId(), c.getReservationLimit());
            }
        }

        LOGGER.debug("Custom reservation limits were inserted in db");
        return "Custom reservation limits were inserted in db";
    }

    public String insert(CustomReservationLimitDTO customReservationLimitDTO) {
        Optional<Services> service = servicesRepository.findById(customReservationLimitDTO.getServiceId());
        CustomReservationLimit customReservationLimit = CustomReservationLimitBuilder.toEntity(customReservationLimitDTO, service.get());
        customReservationLimit.setId(UUID.randomUUID().toString());
        customReservationLimitRepository.save(customReservationLimit);

        LOGGER.debug("Custom reservation limit with id {} was inserted in db", customReservationLimit.getId());
        return customReservationLimit.getId();
    }

    @Transactional
    public String updateCustomReservationLimit(String id, int limit){
        System.out.println(id + " - " + limit);
        customReservationLimitRepository.changeReservationLimitById(id, limit);
        Optional<CustomReservationLimit> updated = customReservationLimitRepository.findById(id);

        return updated.get().getId();
    }



}
