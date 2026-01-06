# Verboheit Mathematics League Competition - API Specification

This documentation outlines the backend API integration for the VMLC landing page.

---

## 1. General Configuration

### Base URL
The API base URL is configured via environment variables.
- **Registration:** Uses `VITE_PORTAL_URL`
- **Pre-Registration:** Uses `VITE_PORTAL_URL` (implied base)

### Authentication
Requests require an API key passed in the headers.

| Header | Description |
| :--- | :--- |
| `x-api-key` | Unique identifier for the client application. |

---

## 2. User Registration

Registers a new user as either a **Candidate** or a **Volunteer**.

- **Endpoint:** `/register/`
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
| `phone_number`| `string` | Phone number (e.g., `+234...`). |
| `document` | `file` | ID/Result upload (Max 5MB). |
| `document_type`| `string` | `NIN` or `school result`. |
| `user_consent_given` | `boolean`| Must be `true`. |

#### Candidate-Specific Fields
| Key | Type | Description |
| :--- | :--- | :--- |
| `school_name` | `string` | Full name of the school. |
| `school_type` | `string` | `public` or `private`. |
| `current_class`| `string` | `SS1`, `SS2`, or `SS3`. |
| `state` | `string` | Lagos, Ogun, Rivers, Cross River, Abuja. |

#### Volunteer-Specific Fields
| Key | Type | Description |
| :--- | :--- | :--- |
| `occupation` | `string` | Current profession. |
| `state` | `string` | Current state of residence. |

### Responses

#### Success (200 OK)
```json
{
  "status": "success",
  "message": "Registration successful as a candidate!"
}
```

#### Error (400/500)
```json
{
  "status": "error",
  "message": "Error description from server."
}
```

---

## 3. Pre-Registration

Leads collection for interested participants.

- **Endpoint:** `/pre-register`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Body
| Key | Type | Description |
| :--- | :--- | :--- |
| `full_name` | `string` | User's full name. |
| `email` | `string` | Valid email address. |
| `phone_number` | `string` | Contact phone. |
| `user_type` | `string` | `candidate` or `volunteer`. |

---

## 4. Implementation Details

### JavaScript Example
```typescript
const formData = new FormData();
formData.append('user_type', userType);
// ... append other fields
formData.append('document', file);

const response = await fetch(`${baseUrl}/register/`, {
  method: 'POST',
  headers: { 'x-api-key': apiKey },
  body: formData,
});
```

### Security & Safety
- **Multipart Data:** Do not manually set `Content-Type` headers when using `FormData` with `fetch`; let the browser handle it.
- **File Validation:** Frontend limits uploads to 5MB and specific formats (.pdf, .jpg, .png).
- **Consent:** The "Register" button is disabled until the user agrees to the Terms & Conditions and Privacy Policy.
