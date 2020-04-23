package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @NotNull
    String name;
    @NotNull
    String password;
    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    List<Session> sessions;
    @JsonBackReference
    @ManyToOne
    Session session;

    public User() {
    }

    public User(int id, String name, String password, Session session, List<Session> sessions) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.session = session;
        this.sessions = sessions;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
