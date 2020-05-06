package ShapeSlate.backend.models;


public class InputMessage {

    private String userTypedTextMessage;

    public InputMessage() {
    }

    public InputMessage(String userTypedTextMessage) {
        this.userTypedTextMessage = userTypedTextMessage;
    }

    public String getUserTypedTextMessage() {
        return userTypedTextMessage;
    }

    public void setUserTypedTextMessage(String userTypedTextMessage) {
        this.userTypedTextMessage = userTypedTextMessage;
    }
}
