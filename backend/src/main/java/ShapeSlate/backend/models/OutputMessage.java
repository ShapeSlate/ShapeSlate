package ShapeSlate.backend.models;

public class OutputMessage {

    private String receivedTextMessage;

    public OutputMessage() {
    }

    public OutputMessage(String receivedTextMessage) {
        this.receivedTextMessage = receivedTextMessage;
    }

    public String getReceivedTextMessage() {
        return receivedTextMessage;
    }

}