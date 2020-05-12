package ShapeSlate.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class SlateUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @NotNull
    String username;
    @NotNull
    String password;

    // many slaterooms can have many slaterooms (junction table uses class SlateRoomHasUser)
    @JsonManagedReference(value = "slateuser")
    @OneToMany(mappedBy = "slateUser")
    List<SlateRoomHasUser> slateRoomHasUsers;

    public SlateUser() {
    }

    public SlateUser(int id, @NotNull String username, @NotNull String password, List<SlateRoomHasUser> slateRoomHasUsers) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.slateRoomHasUsers = slateRoomHasUsers;
    }

    public List<SlateRoomHasUser> getSlateRoomHasUsers() {
        return slateRoomHasUsers;
    }

    public void setSlateRoomHasUsers(List<SlateRoomHasUser> slateRoomHasUsers) {
        this.slateRoomHasUsers = slateRoomHasUsers;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "SlateUser{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", slateRoomHasUsers=" + slateRoomHasUsers +
                '}';
    }
}
