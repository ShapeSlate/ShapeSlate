package ShapeSlate.backend.services;

import ShapeSlate.backend.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserService extends CrudRepository<User, Integer> {
    public User findByName(String name);
}
