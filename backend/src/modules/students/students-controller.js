const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const {findAllStudents, addOrUpdateStudent, findStudentToUpdate, findStudentDetail, findStudentToSetStatus} = require("./students-repository");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    //write your code
    const {name, className, section, roll } = req.query;
    const students = await findAllStudents({name, className, section, roll});
    res.json({students});
});

const handleAddStudent = asyncHandler(async (req, res) => {
    //write your code
    const payload = req.body;
    const message = await addOrUpdateStudent(payload)
    res.json(message);

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const payload = req.body;
    const student = await findStudentToUpdate({payload, id})
    res.json(student);

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code
    const { id } = req.params;
    const student = await findStudentDetail(id);
    res.json(student);

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code
    const {id: userId} = req.params;
    const {id: reviewerId} = req.user;
    const {status} = req.body;
    const message = await findStudentToSetStatus({userId, reviewerId, status });
    res.json(message);

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
