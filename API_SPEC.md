# Verboheit Mathematics League Competition - API Specification

This documentation outlines the backend API integration for the VMLC landing page.

---

## 1. General Configuration

### Base URL
The API base URL is configured via environment variables.
- **Base URL:** Defined by `VITE_API_URL` (e.g., `https://api.verboheit.org`).
- **Sanitization:** The frontend strips trailing slashes from this URL before appending endpoints.

### Authentication
Requests require an API key passed in the `x-api-key` header.

| Endpoint | Environment Variable | Header Key |
| :--- | :--- | :--- |
| `/v1/registration` | `VITE_API_KEY` | `x-api-key` |
| `/v2/register/` | `VITE_API_KEY` | `x-api-key` |
| `/v2/support-us/` | `VITE_API_KEY` | `x-api-key` |
| `/v2/pre-register/` | `VITE_API_KEY` | `x-api-key` |

---

## 2. Registration Status

Checks if registration is currently open for candidates or volunteers.

- **Endpoint:** `/v1/registration`
- **Method:** `GET`
- **Headers:** `x-api-key`

### Response (JSON)
```json
{
  "is_candidate_reg_open": true,
  "is_staff_reg_open": true,
  "support_email": "support@verboheit.org"
}
```

---

## 3. User Registration

Registers a new user as either a **Candidate** or a **Volunteer**.

- **Endpoint:** `/v2/register/`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`

### Request Parameters (Form Data)

#### Common Fields
| Key | Type | Description |
| :--- | :--- | :--- |
| `user_type` | `string` | `candidate` or `volunteer`. |
| `first_name` | `string` | User's first name. |
| `last_name` | `string` | User's last name. |
| `email` | `string` | Valid email address. |
| `phone`| `string` | Phone number (e.g., `091-XXXX-XXXX`). |
| `state` | `string` | State of residence (e.g., `Lagos` for Candidate, free text for Volunteer). |
| `document` | `file` | ID or Result upload (Max 5MB). |
| `document_type`| `string` | `school ID card`, `report card`, `NIN` (Candidate) / `NIN`, `passport`, `drivers license` (Volunteer). |
| `face_capture` | `file` | Facial verification image (Max 5MB). |
| `consent` | `string` | `"true"` or `"false"` (Boolean sent as string). Must be "true" to proceed. |

#### Candidate-Specific Fields (Required if `user_type` is `candidate`)
| Key | Type | Description |
| :--- | :--- | :--- |
| `school_name` | `string` | Full name of the secondary school. |
| `school_type` | `string` | `public` or `private`. |
| `current_class`| `string` | `SS1`, `SS2`, or `SS3`. |

#### Volunteer-Specific Fields (Required if `user_type` is `volunteer`)
| Key | Type | Description |
| :--- | :--- | :--- |
| `occupation` | `string` | Current profession or status. |

---

## 4. Support Inquiry

For sponsorships, partnerships, and other forms of support.

- **Endpoint:** `/v2/support-us/`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Body (JSON)
| Key | Type | Description |
| :--- | :--- | :--- |
| `full_name` | `string` | User's full name. |
| `email` | `string` | Valid email address. |
| `organization`| `string` | (Optional) Organization name. |
| `support_type` | `string` | `sponsorship`, `partnership`, `media`, or `other`. |
| `phone`| `string` | (Optional) Contact phone. |
| `message` | `string` | Detailed inquiry message. |
| `consent` | `boolean` | `true` or `false`. |

---

## 5. Pre-Registration

Lead collection for interested participants.

- **Endpoint:** `/v2/pre-register/`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Body (JSON)
| Key | Type | Description |
| :--- | :--- | :--- |
| `full_name` | `string` | User's full name. |
| `email` | `string` | Valid email address. |
| `phone` | `string` | Contact phone. |
| `interest_type` | `string` | `candidate` or `volunteer`. |

---

## 6. Response Formats

The API returns JSON responses.

### Success (200 OK / 201 Created)
Returned when an action is successfully completed.
```json
{
  "status": "success",
  "message": "Action completed successfully."
}
```

### Error Responses

#### Validation Error (400 Bad Request)
Returned when input data fails validation.
```json
{
  "status": "error",
  "message": "Validation failed.",
  "errors": {
    "email": [
      "A user with this email already exists."
    ],
    "phone": [
      "Enter a valid Nigerian phone number."
    ],
    "non_field_errors": [
      "Global error message if applicable."
    ]
  }
}
```

#### Permission / General Error (403 Forbidden / 400 Bad Request)
Returned when an action is not allowed or for other generic errors.
```json
{
  "detail": "Registration is currently closed."
}
```

---

## 7. Implementation Notes

- **Multipart Data:** The browser handles the boundary for `multipart/form-data`. Do not manually set `Content-Type` headers for `/register/`.
- **File Validation:** The frontend filters files by extension (.pdf, .jpg, .png) and enforces a 5MB size limit.
- **CORS:** Ensure the backend allows requests from the landing page domain and allows the `x-api-key` header.