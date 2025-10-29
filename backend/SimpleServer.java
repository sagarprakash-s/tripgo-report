import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.util.*;
import java.util.concurrent.Executors;

public class SimpleServer {
    private static List<Map<String, Object>> bookings = new ArrayList<>();
    private static int nextId = 1;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        
        server.createContext("/api/bookings", new BookingHandler());
        server.setExecutor(Executors.newFixedThreadPool(10));
        server.start();
        
        System.out.println("Server started on http://localhost:8080");
    }

    static class BookingHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(200, -1);
                return;
            }

            String method = exchange.getRequestMethod();
            String path = exchange.getRequestURI().getPath();
            
            try {
                switch (method) {
                    case "GET":
                        handleGet(exchange, path);
                        break;
                    case "POST":
                        handlePost(exchange);
                        break;
                    case "DELETE":
                        handleDelete(exchange, path);
                        break;
                    default:
                        sendResponse(exchange, 405, "{\"error\":\"Method not allowed\"}");
                }
            } catch (Exception e) {
                sendResponse(exchange, 500, "{\"error\":\"Internal server error\"}");
            }
        }

        private void handleGet(HttpExchange exchange, String path) throws IOException {
            if (path.equals("/api/bookings")) {
                String response = bookingsToJson(bookings);
                sendResponse(exchange, 200, response);
            } else if (path.equals("/api/bookings/count")) {
                sendResponse(exchange, 200, String.valueOf(bookings.size()));
            } else if (path.startsWith("/api/bookings/")) {
                String id = path.substring("/api/bookings/".length());
                Map<String, Object> booking = findBookingById(id);
                if (booking != null) {
                    sendResponse(exchange, 200, bookingToJson(booking));
                } else {
                    sendResponse(exchange, 404, "{\"error\":\"Booking not found\"}");
                }
            }
        }

        private void handlePost(HttpExchange exchange) throws IOException {
            String body = readRequestBody(exchange);
            Map<String, Object> booking = parseBooking(body);
            booking.put("id", String.valueOf(nextId++));
            booking.put("createdAt", new Date().toString());
            bookings.add(booking);
            sendResponse(exchange, 201, bookingToJson(booking));
        }

        private void handleDelete(HttpExchange exchange, String path) throws IOException {
            String id = path.substring("/api/bookings/".length());
            boolean removed = bookings.removeIf(b -> id.equals(b.get("id")));
            if (removed) {
                sendResponse(exchange, 200, "{\"message\":\"Booking deleted successfully\"}");
            } else {
                sendResponse(exchange, 404, "{\"error\":\"Booking not found\"}");
            }
        }

        private void addCorsHeaders(HttpExchange exchange) {
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:3000");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        }

        private void sendResponse(HttpExchange exchange, int code, String response) throws IOException {
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(code, response.getBytes().length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }

        private String readRequestBody(HttpExchange exchange) throws IOException {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))) {
                StringBuilder body = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    body.append(line);
                }
                return body.toString();
            }
        }

        private Map<String, Object> parseBooking(String json) {
            Map<String, Object> booking = new HashMap<>();
            json = json.trim().substring(1, json.length() - 1);
            String[] pairs = json.split(",");
            for (String pair : pairs) {
                String[] keyValue = pair.split(":");
                String key = keyValue[0].trim().replaceAll("\"", "");
                String value = keyValue[1].trim().replaceAll("\"", "");
                booking.put(key, value);
            }
            return booking;
        }

        private String bookingToJson(Map<String, Object> booking) {
            StringBuilder json = new StringBuilder("{");
            boolean first = true;
            for (Map.Entry<String, Object> entry : booking.entrySet()) {
                if (!first) json.append(",");
                json.append("\"").append(entry.getKey()).append("\":\"").append(entry.getValue()).append("\"");
                first = false;
            }
            json.append("}");
            return json.toString();
        }

        private String bookingsToJson(List<Map<String, Object>> bookings) {
            StringBuilder json = new StringBuilder("[");
            for (int i = 0; i < bookings.size(); i++) {
                if (i > 0) json.append(",");
                json.append(bookingToJson(bookings.get(i)));
            }
            json.append("]");
            return json.toString();
        }

        private Map<String, Object> findBookingById(String id) {
            return bookings.stream().filter(b -> id.equals(b.get("id"))).findFirst().orElse(null);
        }
    }
}