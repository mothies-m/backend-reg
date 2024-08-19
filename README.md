# Backend Plateup

## Overview

Backend Plateup is a project that handles user registration, login, profile creation for speakers, session booking, and email notifications. This documentation provides information on how to interact with the API endpoints for these functionalities.

## API Endpoints

### 1. User Registration

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "first_name": "user_first_name",
    "last_name": "user_last_name",
    "email": "user@gmail.com",
    "password":"userpassword",
    "role":"user"
  }

## User Login

### Endpoint

- **Method:** `POST`
- **URL:** `/api/user/login`

### Description

Logs in an existing user by verifying their credentials. If the credentials are valid, the user receives an authentication token, To their mail id(make sure to use valid email id, use @gamil.com for reliablility).

### Request

- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  
## User Verification

### Endpoint

- **Method:** `POST`
- **URL:** `api/auth/login/verify`

### Description

- Verifies a user's account using an OTP (One-Time Password). This endpoint is used to activate or verify a user's email address.
- __Make sure you not the `user_id` after verification.__
### Request

- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }

## Handling API Responses

### Overview

This section provides details on the typical responses returned by the API endpoints. Understanding the structure and types of responses will help you handle API interactions more effectively.

### Common Response Format

All API responses follow a consistent format to ensure clarity and ease of use:

- **Status Code**: The HTTP status code indicating the result of the request.
- **Body**: The JSON object providing detailed information about the response.

### Successful Responses

#### 200 OK

- **Description**: The request was successful, and the response body contains the requested data or confirmation message.
- **Example Body:**
  ```json
  {
    "message": "Operation successful",
    "data": {
      "key": "value"
    }
  }

## Create Speaker Profile

### Endpoint

- **Method:** `POST`
- **URL:** `/api/speaker/getSpeaker`

### Description

Creates a new speaker profile. This endpoint allows users to set up their speaker profile with expertise and pricing details.
Only `Role: speaker` can create a speaker profile.
### Request

- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "user_id": userid ,
    "expertise": "Cyber Security",
    "price_per_session":500.00
  }
  
## View Speakers

### Endpoint

- **Method:** `GET`
- **URL:** `/api/user/speakers`

### Description

Retrieves a list of all available speakers. This endpoint is accessible to anyone, allowing users to view the profiles of speakers.

### Request

- **Content-Type:** `application/json`

### Response

- **Status Code:** `200 OK`
- **Body:**
  ```json
  [
    {
        "user_id": 2,
        "first_name": "John",
        "last_name": "Doe",
        "expertise": "Full Stack Dev",
        "price_per_session": "200.00",
        "created_at": "2024-08-19T16:39:31.000Z"
    },
    {
        "user_id": 6,
        "first_name": "news",
        "last_name": "me",
        "expertise": "Cyber Security",
        "price_per_session": "500.00",
        "created_at": "2024-08-19T16:40:56.000Z"
    }
  ]

## Book a Session

### Endpoint

- **Method:** `POST`
- **URL:** `/api/user/booking`

### Description

Allows a verified user to book a session with a speaker. Each user can book only one session per speaker, and sessions are scheduled with a 1-hour gap between bookings.

### Request

- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "user_id": "user-id",
    "speaker_id": "speaker-id",
    "date":"2024-08-24"
    "time_slot": "10:00:00"
  }

# API Documentation

## Booking Confirmation and Session Timeline

- Description: After booking a session, the user will receive a booking confirmation email and a session timeline email. For reliable OTP and confirmation emails, use a Gmail address.

- Note: Non-Gmail addresses may experience delays in receiving OTP or confirmation emails.

- Note: Time slot available between `09:00:00` - `16:00:00` .

### Email Notification

Once a session is successfully booked, the user will receive an email notification with the following details:

- **Booking Confirmation:** Contains information about the booked session, including the date, time, and speaker.
- **Session Timeline:** Provides a calendar invite for the scheduled session to help users and speakers keep track of their appointments.

