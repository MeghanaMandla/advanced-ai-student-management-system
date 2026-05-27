/* =========================
   ADVANCED AI STUDENT MANAGEMENT SYSTEM
========================= */

/* Local Database */

let students = JSON.parse(

localStorage.getItem("students")

) || [];

/* =========================
   SECTION NAVIGATION
========================= */

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

/* =========================
   ADD STUDENT
========================= */

function addStudent(){

    let name =
    document
    .getElementById("name")
    .value.trim();

    let email =
    document
    .getElementById("email")
    .value.trim();

    let course =
    document
    .getElementById("course")
    .value.trim();

    /* Validation */

    if(
        name === "" ||
        email === "" ||
        course === ""
    ){

        notify("Please fill all fields");

        return;
    }

    /* Student Object */

    let student = {

        id:Date.now(),

        name:sanitize(name),

        email:sanitize(email),

        course:sanitize(course)
    };

    /* Add */

    students.push(student);

    /* Save */

    localStorage.setItem(

        "students",

        JSON.stringify(students)
    );

    /* Update UI */

    renderStudents();

    updateDashboard();

    updateChart();

    notify("Student Added Successfully");

    clearInputs();
}

/* =========================
   RENDER STUDENTS
========================= */

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

/* =========================
   EDIT STUDENT
========================= */

function editStudent(id){

    let student =
    students.find(s => s.id === id);

    let name =
    prompt(
        "Edit Student Name",
        student.name
    );

    if(name){

        student.name =
        sanitize(name);

        localStorage.setItem(

            "students",

            JSON.stringify(students)
        );

        renderStudents();

        notify("Student Updated");
    }
}

/* =========================
   DELETE STUDENT
========================= */

function deleteStudent(id){

    students =
    students.filter(
        s => s.id !== id
    );

    localStorage.setItem(

        "students",

        JSON.stringify(students)
    );

    renderStudents();

    updateDashboard();

    updateChart();

    notify("Student Deleted");
}

/* =========================
   SEARCH STUDENT
========================= */

function searchStudent(){

    let input =
    document
    .getElementById("search")
    .value.toLowerCase();

    let rows =
    document.querySelectorAll(
        "#studentTable tr"
    );

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

/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard(){

    document
    .getElementById("totalStudents")
    .innerText = students.length;
}

/* =========================
   NOTIFICATIONS
========================= */

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

/* =========================
   SECURITY VALIDATION
========================= */

function sanitize(input){

    return input
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
}

/* =========================
   CLEAR INPUTS
========================= */

function clearInputs(){

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("course").value="";
}

/* =========================
   QR ATTENDANCE
========================= */

new QRCode(

document.getElementById("qrcode"),

"Advanced Student Attendance"
);

/* =========================
   FACE RECOGNITION
========================= */

async function startFaceRecognition(){

    const video =
    document.getElementById("video");

    navigator.mediaDevices
    .getUserMedia({ video:true })

    .then(stream => {

        video.srcObject = stream;
    });

    notify(
        "Face Recognition Started"
    );
}

/* =========================
   AI ASSISTANT
========================= */

async function askAI(){

    let prompt =
    document
    .getElementById("aiPrompt")
    .value;

    document
    .getElementById("aiResponse")
    .innerText =

    "AI Assistant Ready: " + prompt;
}

/* =========================
   ANALYTICS CHART
========================= */

const ctx =
document.getElementById("studentChart");

let studentChart =
new Chart(ctx, {

    type:"bar",

    data:{

        labels:[
            "Students",
            "Courses"
        ],

        datasets:[{

            label:"Analytics",

            data:[
                students.length,
                12
            ],

            backgroundColor:[

                "#06b6d4",

                "#2563eb"
            ],

            borderRadius:10
        }]
    },

    options:{

        responsive:true,

        plugins:{

            legend:{

                labels:{

                    color:"white"
                }
            }
        },

        scales:{

            y:{

                ticks:{

                    color:"white"
                }
            },

            x:{

                ticks:{

                    color:"white"
                }
            }
        }
    }
});

/* Update Chart */

function updateChart(){

    studentChart.data.datasets[0]
    .data[0] = students.length;

    studentChart.update();
}

/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
        .getElementById("loader")
        .style.display = "none";

    },1500);
});

/* =========================
   DASHBOARD COUNTER
========================= */

function animateCounter(id,target){

    let count = 0;

    let interval =
    setInterval(() => {

        count++;

        document
        .getElementById(id)
        .innerText = count;

        if(count >= target){

            clearInterval(interval);
        }

    },30);
}

animateCounter(
    "totalStudents",
    students.length
);

/* =========================
   DARK/LIGHT THEME
========================= */

function toggleTheme(){

    document.body
    .classList.toggle("light-theme");

    notify("Theme Changed");
}

/* =========================
   PWA SUPPORT
========================= */

if("serviceWorker" in navigator){

    window.addEventListener("load", () => {

        navigator.serviceWorker
        .register("service-worker.js")

        .then(() => {

            console.log("PWA Ready");
        });
    });
}

/* =========================
   INITIAL LOAD
========================= */

renderStudents();

updateDashboard();

updateChart();
