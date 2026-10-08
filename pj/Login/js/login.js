// js/login.js

// ฐานข้อมูลพนักงานจำลอง
const usersDatabase = {
    "employee1": {
        password: "123",
        role: "employee",
        username: "นายสมชาย ใจดี",
        fullNameEn: "Mr. Somchai Jaidee",
        idCard: "1-1002-34567-89-0",
        birthDate: "15 พฤษภาคม 2538 (อายุ 31 ปี)",
        address: "99/12 หมู่ 4 ต.คลองหนึ่ง อ.คลองหลวง จ.ปทุมธานี 12120",
        empId: "EMP-2026-175",
        position: "เจ้าหน้าที่สนับสนุน IT Support",
        dept: "แผนกเทคโนโลยีสารสนเทศ (IT Support โรงงาน)",
        plant: "โรงงานนิคมอุตสาหกรรมนวนคร (Plant 1)",
        startDate: "01 มกราคม 2024 (อายุงาน 2 ปี 9 เดือน)",
        shift: "กะเช้า (08:00 - 17:00 น.)",
        email: "somchai.j@company.com",
        phone: "081-234-5678",
        emergencyContact: "นางสมศรี ใจดี (มารดา) - 089-999-8888"
    },
    "employee2": {
        password: "123",
        role: "employee",
        username: "นางสาววิภาดา สุขเสริฐ",
        fullNameEn: "Ms. Wiphada Suksaert",
        idCard: "3-1005-98765-43-2",
        birthDate: "20 สิงหาคม 2541 (อายุ 28 ปี)",
        address: "45/8 หมู่ 2 ต.บางกระดี อ.เมือง จ.ปทุมธานี 12000",
        empId: "EMP-2026-189",
        position: "เจ้าหน้าที่ควบคุมคุณภาพ (QA Officer)",
        dept: "ฝ่ายควบคุมคุณภาพ (Quality Assurance)",
        plant: "โรงงานนิคมอุตสาหกรรมบางกะดี (Plant 2)",
        startDate: "15 มิถุนายน 2025 (อายุงาน 1 ปี 4 เดือน)",
        shift: "กะบ่าย (16:00 - 01:00 น.)",
        email: "wiphada.s@company.com",
        phone: "089-876-5432",
        emergencyContact: "นายสมศักดิ์ สุขเสริฐ (บิดา) - 081-111-2222"
    },
    "admin": {
        password: "admin",
        role: "admin",
        username: "ผู้ดูแลระบบ (Admin)",
        empId: "ADM-2026-001"
    }
};

function handleLogin(event) {
    if (event) event.preventDefault();
    
    const userInput = document.getElementById("username").value.trim();
    const passInput = document.getElementById("password").value.trim();

    const userData = usersDatabase[userInput];

    if (userData && userData.password === passInput) {
        // บันทึกข้อมูลเข้า localStorage
        localStorage.setItem("username", userData.username);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userData", JSON.stringify(userData));

        if (typeof logUserActivity === "function") {
            logUserActivity("เข้าสู่ระบบ", `ผู้ใช้งาน ${userData.username} เข้าสู่ระบบสำเร็จ`);
        }

        // ย้ายหน้าตามสิทธิ์
        if (userData.role === "admin") {
            window.location.href = "../admin/admin.html";
        } else {
            window.location.href = "../employee/employee.html";
        }
    } else {
        alert("❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง\n\nทดสอบใช้งาน:\n• Username: employee1 | Password: 123\n• Username: employee2 | Password: 123");
    }
}