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
    String name;
    @NotNull
    String password;

    // many slaterooms can have many slaterooms (junction table uses class SlateRoomHasUser)
    @JsonManagedReference(value = "slateuser")
    @OneToMany(mappedBy = "slateUser")
    List<SlateRoomHasUser> slateRoomHasUsers;

    public SlateUser() {
    }

    public SlateUser(int id, @NotNull String name, @NotNull String password, List<SlateRoomHasUser> slateRoomHasUsers) {
        this.id = id;
        this.name = name;
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

    @Override
    public String toString() {
        return "SlateUser{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", slateRoomHasUsers=" + slateRoomHasUsers +
                '}';
    }
}
