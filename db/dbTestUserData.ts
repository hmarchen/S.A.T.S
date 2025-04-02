import DBUsers from './dbUsers';

const testConnection = async () => {
    try {
        const dbUser = new DBUsers();
        console.log('Connected to the database successfully!');

        try {
            // Create user test
            await dbUser.createUser('john.doe@fakeemail.com', 'John', 'Doe', 'password123', 'admin');
            await dbUser.createUser('some.fake@email.com', 'New', 'User', 'password123', 'advisor');
            await dbUser.createUser('another@user.com', 'Another', 'User', 'password123', 'advisor');
            await dbUser.createUser('yipeppe.yahoooo@fakeemail.com', 'YAYAYAY', 'WOOOO', 'password123', 'admin');
            console.log("Successfully CREATED users!");
            
            dbUser.closeConnection();
        } catch (error) {
            console.error('Error during user operations:', error);
        }
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

testConnection(); 