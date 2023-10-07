## Getting Started

-- Technologies Used

- Nextjs (13.5.4)
- TailwindCss
- Formik
- Yup
- Toastify

---

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

---

Welcome OtobüsBiletim application

1. In order to search for ticket journeys, you first need to register.
2. When you reach the login screen, if you have an account, you can log in.
3. If you don't have an account, click on the 'Not a member yet?' button located at the bottom.
4. On the registration screen, you are required to provide your name, surname, email, password, date of birth, and gender. It is mandatory to fill in all fields. If you leave any field blank, a warning message will appear below the unfilled field.
5. After a successful registration, you will be redirected to the login screen, and you need to log in with the account you have just created.
6. Once you are logged in, you can search for tickets to your desired destination from the homepage.
7. After selecting the departure point, destination, and travel date, click on the 'Find Tickets' button.
8. If there are available journeys for the selected date, departure point, and destination, you will see a list of available journeys. If there are no journeys available for the selected date range, you will receive a notification stating that no journeys are available.
9. In the journey card, you will find information such as the bus company name, departure time, available seats, bus type, price, and travel duration.
10. Clicking on any of the journeys will redirect you to the bus seat selection screen.
11. On the seat selection screen, there are 20 seats on the bus. Occupied seats are displayed in pink for females and blue for males. Users can select white, unoccupied seats.
12. Users can select a maximum of 5 seats. If they select more than 5 seats, an information message is displayed.
13. Mixed-gender users are not allowed to sit side by side. If selected, an information message is displayed. Gender information is collected during registration.
14. The table below displays the user's selected seat numbers and the total price.
15. Once seat selection is complete, when the user clicks the 'Confirm and Continue' button, they will be directed to the payment screen.
16. On the payment screen, the left card section provides information about the selected bus company, departure point, destination, departure time, and seat quantity.
17. On the right card section, the user's card information is collected. The purchase cannot be made without entering card details. If the card information is correct, the card purchase process is successful, and a confirmation message appears, redirecting the user to the homepage.
18. When the user clicks on the 'Logout' option in the navigation bar, they are logged out.
19. If the user wants to search for bus tickets again, they can log in with their registered account.

# 1. Our Bus Journeys

- Istanbul > Izmir: There are 2 journeys available on 2023-10-07.

- Izmir > Istanbul: There are 2 journeys available on 2024-10-04.

- Antalya > Ankara: There is 1 journey available on 2023-12-04.

- Ankara > Antalya: There is 1 journey available on 2023-12-04.

## BY MUHAMMET ÇETİNKAYA
