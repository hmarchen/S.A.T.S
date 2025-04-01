import DBUsers from './dbUsers';

const testConnection = async () => {
    try {
        const dbUser = new DBUsers();
        console.log('Connected to the database successfully!');

        try {
            // Create user test
            const user = await dbUser.createUser('John', 'Doe', 'john.doe@fakeemail.com', 'password123', 'admin');
            console.log("Successfully CREATED user!");
            console.log(user);

            // Update user test
            user.setFirstName('Jane');
            await dbUser.updateUser(user);
            console.log("Successfully UPDATED user!");
            
            // Read/Get user test
            const gotUser = await dbUser.getUserById(user.userId);
            console.log("Successfully READ user!");
            console.log(gotUser);
            
            // Delete user test
            await dbUser.deleteUser(user.userId);
            console.log("Successfully DELETED user!");

            // close connection
            dbUser.closeConnection();
        } catch (error) {
            console.error('Error during user operations:', error);
        }
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

testConnection(); 