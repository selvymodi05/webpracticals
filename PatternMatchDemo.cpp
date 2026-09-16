
record Customer(int accountNumber, String name) {}

class PatternMatchDemo {
    public static void main(String[] args) {
       Object  obj = new Customer(201, "Swayam");

        if (obj instanceof Customer c) {
            System.out.println("Account Number: " + c.accountNumber());
        }
    }
}