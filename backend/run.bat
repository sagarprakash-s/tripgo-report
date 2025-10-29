@echo off
cd /d "%~dp0"
javac -cp "." -d target/classes src/main/java/com/busbooking/*.java src/main/java/com/busbooking/controller/*.java src/main/java/com/busbooking/model/*.java src/main/java/com/busbooking/repository/*.java src/main/java/com/busbooking/service/*.java
java -cp "target/classes" com.busbooking.BusBookingApplication