package ro.tuc.ds2020.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.Security.AuthenticationRequest;
import ro.tuc.ds2020.Security.AuthenticationResponse;
import ro.tuc.ds2020.Security.JwtUtil;
import ro.tuc.ds2020.Security.RegisterRequest;
import ro.tuc.ds2020.dtos.UsersDTO;
import ro.tuc.ds2020.services.*;
import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.List;
import java.util.UUID;


@RestController
@CrossOrigin
@RequestMapping()
public class UsersController {

    private final UsersService usersService;

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersController.class);

    // --------------------------- jwt token security
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;


    @Autowired
    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public ResponseEntity<?> insertSimpleUser(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        insertSimpleUser();
        System.out.println(authenticationRequest.getEmail() + " " + authenticationRequest.getPassword());
        return ResponseEntity.ok("user inserted");
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or passwd", e);
        }

        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getEmail());

        final String jwt =jwtTokenUtil.generateToken(userDetails);

        UsersDTO user = usersService.findUser(authenticationRequest.getEmail(), authenticationRequest.getPassword());

        return ResponseEntity.ok(new AuthenticationResponse(jwt, user));

    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationTokenOnRegister(@RequestBody RegisterRequest registerRequest) throws Exception {

        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setId(UUID.randomUUID().toString());
        usersDTO.setPhone(registerRequest.getPhoneNumber());
        usersDTO.setEmail(registerRequest.getEmail());
        usersDTO.setLastName(registerRequest.getLastName());
        usersDTO.setFirstName(registerRequest.getFirstName());
        usersDTO.setRole(registerRequest.getRole());
        usersDTO.setPassword(registerRequest.getPassword());
//        if(registerRequest.getServiceId() != null)
        usersDTO.setServiceId(registerRequest.getServiceId());
        try {
            usersService.insert(usersDTO);
        }
        catch (Exception e){
            throw new Exception("Email already exists.", e);
        }


        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(registerRequest.getEmail(), registerRequest.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or passwd.", e);
        }

        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(registerRequest.getEmail());

        final String jwt =jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));

    }

    @RequestMapping(value = "/users", method = RequestMethod.GET)
//    @GetMapping()
    public ResponseEntity<List<UsersDTO>> getUsers() {
        System.out.println("get users");
        List<UsersDTO> dtos = usersService.findUsers();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    public void insertSimpleUser(){
        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setPhone("07344245662");
        usersDTO.setEmail("usertest@yahoo.com");
        usersDTO.setFirstName("firstname");
        usersDTO.setLastName("lastname");
        usersDTO.setRole("admin");
        usersDTO.setPassword("password");
        try {
            usersService.insert(usersDTO);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/users", method = RequestMethod.POST)
//    @PostMapping()
    public ResponseEntity<String> insertUser(@Valid @RequestBody UsersDTO usersDTO) throws MessagingException {
        String userID = usersService.insert(usersDTO);
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/user/delete/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> deleteUseById(@PathVariable String id) throws Exception {
        System.out.println("delete useddddrrr mrrrrrrr" + " " + id);
        UsersDTO dto = usersService.deleteUserById(id);
        try{
            return ResponseEntity.ok(dto);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting user");
        }

    }
}
