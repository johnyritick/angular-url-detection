const userschema = {

}

const userLogin = {
    schema: {
        "name": "Ritick",
        "email": "johnyritick@gmail.com",
        "password": "Test@123",
        "confirmPassword": "Test@123",
        "city": "MAUNATH BHANJAN",
        "country": "india",
        "contact": "8004367180",
        "gender": "male",
        "dob": "14-08-2024",
        "address": "D/13, Power House Colony, Nizzamuddinpura",
        "blood": "A-",
        "medical_history": "None",
        "role": "donor"
    },
    payload: {
        "email": "example@gmail.com",
        "password": "Test@123"
    },
    response: {
        "success": true,
        "auth_token": "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiZG9ub3IiLCJJc3N1ZXIiOiJSaXRpY2siLCJVc2VybmFtZSI6ImV4YW1wbGVAZ21haWwuY29tIiwiZXhwIjoxNzIzNjIwMjE2LCJpYXQiOjE3MjM2MjAyMTZ9.WIK7jdxl2VN4mkRGVZ9w7-eJuMb0RtwuAaVgzZnbYYo",
        "message": "User logged in successfully"
    },
    api: "https://4a5e142d80bb4e7696f80ca1d58817e6.api.mockbin.io/"
}

const registrationApi = {
    payload: {
        "name": "Ritick",
        "email": "johnyritick@gmail.com",
        "password": "Test@123",
        "confirmPassword": "Test@123",
        "city": "MAUNATH BHANJAN",
        "country": "india",
        "contact": "8004367180",
        "gender": "male",
        "dob": "14-08-2024",
        "address": "D/13, Power House Colony, Nizzamuddinpura",
        "blood": "A-",
        "medical_history": "None",
        "role": "donor"
    },
    response: {
        "success": true,
        "message": "User regisetered successfully"
    },
    api: "https://58196afff7f741a58e667a248efed4f4.api.mockbin.io/"
}

