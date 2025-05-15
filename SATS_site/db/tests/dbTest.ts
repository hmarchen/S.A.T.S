import DBUsers from '../dbUsers';
import DBStudents from '../dbStudents';
import DBAppointments from '../dbAppointments';

async function DBUserTest() {
    const dbUser = new DBUsers();
    console.log('Connected to the database successfully!');
    
    // Create user test
    const user = await dbUser.createUser(
        'john.doe@fakeemail.com', 'John', 'Doe', 'password123', 'admin'
    );
    console.log("Successfully CREATED user!");
    console.log(user);

    // Update user test
    user.setFirstName('Jane');
    await dbUser.updateUser(user);
    console.log("Successfully UPDATED user!");
    
    // Read/Get user test
    const gotUser = await dbUser.getUserByEmail(user.email);
    console.log("Successfully READ user!");
    console.log(gotUser);
    
    // Delete user test
    await dbUser.deleteUser(user.email);
    console.log("Successfully DELETED user!");

    dbUser.closeConnection();
}

async function DBStudentTest() {
    const dbStudent = new DBStudents();
    console.log('Connected to the database successfully!');
    
    // Create student test
    const student = await dbStudent.createStudent(
        123456789, 'jane.doe@fakeemail.com', 'Jane', 'Doe', 'Main Campus', 'Computer Science'
    );
    console.log("Successfully CREATED student!");
    console.log(student);

    // Update student test
    student.setFirstName('Dennis');
    await dbStudent.updateStudent(student);
    console.log("Successfully UPDATED student!");
    
    // Read/Get student test
    const gotUser = await dbStudent.getStudentById(student.id);
    console.log("Successfully READ student!");
    console.log(gotUser);
    
    // Delete student test
    await dbStudent.deleteStudent(student.id);
    console.log("Successfully DELETED student!");

    dbStudent.closeConnection();
}

async function DBAppointmentTest() {
    const dbAppointments = new DBAppointments();
    console.log('Connected to the database successfully!');
    
    // Create appointment test
    const appointment = await dbAppointments.createAppointment(
        'john.doe@fakeemail.com', 101000001, 'Academic Advising', '2023-10-15'
    );
    console.log("Successfully CREATED appointment!");
    console.log(appointment);

    // Update appointment test
    appointment.setReason('This is a new reason');
    await dbAppointments.updateAppointment(appointment);
    console.log("Successfully UPDATED appointment!");
    
    // Read/Get appointment test
    const gotUser = await dbAppointments.getAppointmentById(appointment.id);
    console.log("Successfully READ appointment!");
    console.log(gotUser);
    
    // Delete appointment test
    await dbAppointments.deleteAppointment(appointment.id);
    console.log("Successfully DELETED appointment!");

    dbAppointments.closeConnection();
}


const testConnection = async () => {
    try {
        // tests
        // await DBUserTest();
        // await DBStudentTest();
        await DBAppointmentTest();

    } catch (error) {
        console.error('Error completing queries:', error);
    }
};

testConnection(); 