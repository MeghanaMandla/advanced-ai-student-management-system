let students = JSON.parse(
localStorage.getItem("students")
) || [];

/* Firebase */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_AUTH_DOMAIN",

    projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/* Sections */

function showSection(sectionId){

    let sections =
    document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.remove("active");
    });

    document
    .getElementById(sectionId)
    .classList.add("active");
}

/* Add Student */

function addStudent(){

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let course =
    document.getElementById("course").value.trim();

    if(name === "" ||
       email === "" ||
       course === ""){

        notify("Fill all fields");

        return;
    }

    let student = {

        id:Date.now(),

        name:sanitize(name),

        email:sanitize(email),

        course:sanitize(course)
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    db.collection("students")
    .add(student);

    renderStudents();

    updateDashboard();

    generateAnalytics();

    notify("Student Added");

    clearInputs();
}

/* Render */

function renderStudents(){

    let table =
    document.getElementById("studentTable");

    table.innerHTML = `

    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Course</th>
        <th>Action</th>
    </tr>
    `;

    students.forEach(student => {

        let row = table.insertRow();

        row.innerHTML = `

        <td>${student.name}</td>

        <td>${student.email}</td>

        <td>${student.course}</td>

        <td>

        <button onclick="editStudent(${student.id})">
        Edit
        </button>

        <button onclick="deleteStudent(${student.id})">
        Delete
        </button>

        </td>
        `;
    });
}

/* Edit */

function editStudent(id){

    let student =
    students.find(s => s.id === id);

    let name =
    prompt("Edit Name", student.name);

    if(name){

        student.name = sanitize(name);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        renderStudents();

        notify("Updated");
    }
}

/* Delete */

function deleteStudent(id){

    students =
    students.filter(s => s.id !== id);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    renderStudents();

    updateDashboard();

    notify("Deleted");
}

/* Search */

function searchStudent(){

    let input =
    document
    .getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll("#studentTable tr");

    rows.forEach((row,index) => {

        if(index === 0) return;

        row.style.display =
        row.innerText
        .toLowerCase()
        .includes(input)
        ? ""
        : "none";
    });
}

/* Dashboard */

function updateDashboard(){

    document
    .getElementById("totalStudents")
    .innerText = students.length;
}

/* Analytics */

function generateAnalytics(){

    let total = students.length;

    let insight =
    total > 20
    ? "High Student Activity"
    : "Normal Activity";

    document
    .getElementById("aiAnalytics")
    .innerText = insight;
}

/* Notification */

function notify(message){

    let notification =
    document.createElement("div");

    notification.className =
    "notification";

    notification.innerText =
    message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.remove();

    },3000);
}

/* Security */

function sanitize(input){

    return input
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

/* QR */

new QRCode(
document.getElementById("qrcode"),
"Attendance System"
);

/* Face Recognition */

async function startFaceRecognition(){

    const video =
    document.getElementById("video");

    navigator.mediaDevices
    .getUserMedia({ video:{} })

    .then(stream => {

        video.srcObject = stream;
    });

    notify("Face Recognition Started");
}

/* AI */

async function askAI(){

    let prompt =
    document.getElementById("aiPrompt").value;

    document
    .getElementById("aiResponse")
    .innerText =

    "AI Assistant Ready";
}

/* Admin */

function backupData(){

    localStorage.setItem(
        "backup",
        JSON.stringify(students)
    );

    notify("Backup Completed");
}

function clearAllStudents(){

    students = [];

    localStorage.removeItem("students");

    renderStudents();

    notify("All Students Cleared");
}

/* Clear */

function clearInputs(){

    document.getElementById("name").value="";

    document.getElementById("email").value="";

    document.getElementById("course").value="";
}

/* Charts */

const ctx =
document.getElementById("studentChart");

new Chart(ctx, {

    type:"bar",

    data:{

        labels:["Students","Courses"],

        datasets:[{

            label:"Analytics",

            data:[students.length,12],

            backgroundColor:[
                "#2563eb",
                "#06b6d4"
            ]
        }]
    }
});

/* Load */

renderStudents();

updateDashboard();

generateAnalytics();
