package ro.tuc.ds2020.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.Security.MyUserDetails;
import ro.tuc.ds2020.entities.Users;
import ro.tuc.ds2020.repositories.UsersRepository;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    public UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> userOptional = usersRepository.findByEmail(email);
//        System.out.println("ssssssssssssssssssssssss: " + userOptional.get().getId());
        userOptional.orElseThrow(() -> new UsernameNotFoundException("Nout found: " + email));
        System.out.println(userOptional.get().getId());
        return new MyUserDetails(userOptional.get());
//        return new User("name", "password", new ArrayList<>());
    }
}
