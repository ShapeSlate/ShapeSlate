package ShapeSlate.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @NotNull
    String typedtext;

    public Message(int id, @NotNull String typedtext) {
        this.id = id;
        this.typedtext = typedtext;
    }

    public Message(){}



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTypedtext() {
        return typedtext;
    }

    public void setTypedtext(String typedtext) {
        this.typedtext = typedtext;
    }



}
