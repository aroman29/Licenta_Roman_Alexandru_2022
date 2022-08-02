package ro.tuc.ds2020.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.dtos.CarJobDTO;
import ro.tuc.ds2020.dtos.MessagesDTO;
import ro.tuc.ds2020.dtos.UsersDTO;
import ro.tuc.ds2020.dtos.builders.UsersBuilder;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.services.CarJobService;
import ro.tuc.ds2020.services.MessagesService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin
public class MessagesController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarJobController.class);
    private MessagesService messagesService;

    @Autowired
    public MessagesController(MessagesService messagesService){
        this.messagesService = messagesService;
    }

    @RequestMapping(value = "/messages/get", method = RequestMethod.GET)
    public ResponseEntity<?> getMessages() {
        List<MessagesDTO> dtos = messagesService.getMessages();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/message/insert", method = RequestMethod.POST)
    public ResponseEntity<?> insertMessage(@RequestBody MessagesDTO messagesDTO) throws Exception {
        messagesDTO.setId(UUID.randomUUID().toString());
        MessagesDTO dto = messagesService.insert(messagesDTO);
        return ResponseEntity.ok(dto);
    }

    @RequestMapping(value = "/message/seen/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> seenMessageById(@PathVariable String id) throws Exception {
        MessagesDTO dto = messagesService.setMessageToSeen(id);
        try{
            return ResponseEntity.ok(dto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error seeing message");
        }

    }

}
