# Welcome to S.A.T.S.



https://github.com/user-attachments/assets/a99be301-1e88-4c96-abd3-83087a0d7192




## Get started

1. Install dependencies

   
```bash
   npm install
```

2. Start the app

   
```bash
   npx expo start
```

---

## 🚀 Starting the Server (automatic)

To start the server for the SATS app:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hmarchen/S.A.T.S.git
   cd S.A.T.S
2. **Start the compose container**
   ```bash
   docker compose up -d
   ```
   or
   ```bash
   docker-compose up -d
---

## Starting the Backend Services (manual)

### Starting the Auth Service

To start the `authService`, follow these steps:

1. Navigate to the directory where `authService.ts` is located.
2. Run the following command to start the service:

   ```bash
   npx ts-node authService.ts
   ```

Remember to close the service when you're done. You cannot run both instances of a service at the same time.

### Starting the Fetch Program Service

To start the `fetchProgramService`, follow these steps:

1. Navigate to the directory where `fetchProgramService.ts` is located.
2. Run the following command to start the service:

   ```bash
   npx ts-node fetchProgramService.ts
   ```
