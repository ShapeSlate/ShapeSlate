package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @NotNull
    String sessionName;
    @JsonBackReference
    @ManyToOne
    User user;
    @JsonManagedReference
    @OneToMany(mappedBy = "session")
    List<User> users;

    public Session() {
    }

    public Session(int id, String sessionName, User user, List<User> users) {
        this.id = id;
        this.sessionName = sessionName;
        this.user = user;
        this.users = users;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSessionName() {
        return sessionName;
    }

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }
}
