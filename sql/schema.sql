CREATE DATABASE IF NOT EXISTS hotel_booking;
USE hotel_booking;

-- Users Table
CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user',
  status ENUM('active', 'banned') DEFAULT 'active'
);

-- Hotels Table
CREATE TABLE hotels(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(100),
  price DECIMAL(10, 2),
  description TEXT
);

-- Bookings Table
CREATE TABLE bookings(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  hotel_id INT,
  check_in DATE,
  check_out DATE,
  guests INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);

-- Login Logs Table
CREATE TABLE login_logs(
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  ip_address VARCHAR(45),
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
