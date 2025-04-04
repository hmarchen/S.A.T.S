import DBUsers from '../dbUsers';
import DBStudents from '../dbStudents';
import DBAppointments from '../dbAppointments';


async function CreateDBUserData() {
    const dbUser = new DBUsers();
    dbUser.openConnection();
    console.log('Connected to the database successfully!');

    // Create user test
    await dbUser.createUser('john.doe@fakeemail.com', 'John', 'Doe', 'password123', 'admin');
    await dbUser.createUser('some.fake@email.com', 'New', 'User', 'password123', 'advisor');
    await dbUser.createUser('another@user.com', 'Another', 'User', 'password123', 'advisor');
    await dbUser.createUser('yipeppe.yahoooo@fakeemail.com', 'YAYAYAY', 'WOOOO', 'password123', 'admin');
    console.log("Successfully CREATED users!");+
    
    dbUser.closeConnection();
}

async function CreateDBStudentData() {
    const dbStudents = new DBStudents();
    dbStudents.openConnection();
    console.log('Connected to the database successfully!');

    // Create user test
    await dbStudents.createStudent(101000001, 'alice.smith@fakeemail.com', 'Alice', 'Smith', 'North Campus', 'Computer Science');
    await dbStudents.createStudent(101000002, 'bob.jones@fakeemail.com', 'Bob', 'Jones', 'South Campus', 'Mechanical Engineering');
    await dbStudents.createStudent(101000003, 'carol.brown@fakeemail.com', 'Carol', 'Brown', 'East Campus', 'Business Administration');
    await dbStudents.createStudent(101000004, 'dave.wilson@fakeemail.com', 'Dave', 'Wilson', 'West Campus', 'Electrical Engineering');
    console.log("Successfully CREATED users!");
    
    dbStudents.closeConnection();
}

async function CreateDBAppointmentData() {
    const dbAppointments = new DBAppointments();
    dbAppointments.openConnection();
    console.log('Connected to the database successfully!');

    // Create user test
    await dbAppointments.createAppointment('john.doe@fakeemail.com', 101000001, 'Consultation', '2023-11-01');
    await dbAppointments.createAppointment('some.fake@email.com', 101000002, 'Follow-up', '2023-11-02');
    await dbAppointments.createAppointment('another@user.com', 101000003, 'Initial Meeting', '2023-11-03');
    await dbAppointments.createAppointment('yipeppe.yahoooo@fakeemail.com', 101000004, 'Progress Review', '2023-11-04');
    console.log("Successfully CREATED users!");
    
    dbAppointments.closeConnection();
}


const testConnection = async () => {
    try {
        // await CreateDBUserData();
        // await CreateDBStudentData();
        await CreateDBAppointmentData();

    } catch (error) {
        console.error('Error creating data:', error);
    }
};

testConnection();