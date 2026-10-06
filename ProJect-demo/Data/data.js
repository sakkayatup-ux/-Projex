// ข้อมูลจำลองผู้ใช้งานระบบ (เพิ่ม พนักงาน 2 คน + Admin 1 คน)
const USERS = {
    // พนักงานคนที่ 1
    "EMP00123": {
        id: "EMP00123",
        username: "staff01",
        password: "123",
        name: "นนท์ วัฒนกิจ",
        role: "employee",
        roleName: "พนักงาน",
        avatar: "N",
        dept: "ฝ่ายการตลาด"
    },
    // พนักงานคนที่ 2
    "EMP00124": {
        id: "EMP00124",
        username: "staff02",
        password: "123",
        name: "สมหญิง ตั้งใจทำ",
        role: "employee",
        roleName: "พนักงาน",
        avatar: "S",
        dept: "ฝ่ายบัญชี"
    },
    // Admin / HR
    "ADMIN001": {
        id: "ADMIN001",
        username: "admin",
        password: "123",
        name: "สมศักดิ์ ผู้ดูแลระบบ",
        role: "admin",
        roleName: "HR Admin",
        avatar: "A",
        dept: "ฝ่ายทรัพยากรบุคคล (HR)"
    }
};

// ตรวจสอบเซสชันผู้ใช้ปัจจุบัน
function getCurrentUser() {
    const saved = localStorage.getItem('current_user');
    if (saved) return JSON.parse(saved);
    return USERS["EMP00123"];
}

// ตรวจสอบและซ่อน/แสดง Sidebar Menu ตาม Role
function renderSidebarMenu(activeMenu) {
    const user = getCurrentUser();
    
    const employeeMenus = [
        { name: '🏠 หน้าหลัก', link: '../หน้า HOME/index.html', key: 'home' },
        { name: '👤 ข้อมูลพนักงาน', link: '../ข้อมูลพนักงาน/index.html', key: 'profile' },
        { name: '🎁 สิทธิ์สวัสดิการ', link: '../สวัสดิการ/benefit-rights.html', key: 'rights' },
        { name: '📝 ยื่นคำขอสวัสดิการ', link: '../สวัสดิการ/claim-form.html', key: 'claim' },
        { name: '📋 คำขอของฉัน', link: '../สวัสดิการ/my-claims.html', key: 'my-claims' },
    ];

    const adminMenus = [
        { name: '🏠 หน้าหลัก', link: '../หน้า HOME/index.html', key: 'home' },
        { name: '👤 ข้อมูลพนักงาน', link: '../ข้อมูลพนักงาน/index.html', key: 'profile' },
        { name: '📊 HR Admin Dashboard', link: '../สวัสดิการ/admin-dashboard.html', key: 'admin' },
        { name: '📈 รายงาน', link: '../สวัสดิการ/report.html', key: 'report' },
    ];

    const currentMenus = (user.role === 'admin') ? adminMenus : employeeMenus;
    
    let html = '';
    currentMenus.forEach(item => {
        const activeClass = (item.key === activeMenu) ? 'class="active"' : '';
        html += `<li><a href="${item.link}" ${activeClass}>${item.name}</a></li>`;
    });
    
    html += `<li><a href="../Login/index.html" onclick="logout()" style="margin-top: 20px; color: #ff8b8b;">🚪 ออกจากระบบ</a></li>`;
    
    const menuEl = document.getElementById('mainMenu');
    if (menuEl) menuEl.innerHTML = html;

    const profileEl = document.getElementById('headerProfile');
    if (profileEl) {
        profileEl.innerHTML = `
            <div class="avatar">${user.avatar}</div>
            <div>
                <strong>${user.name}</strong><br>
                <small style="color: #788592;">${user.roleName}</small>
            </div>
        `;
    }
}

// ออกจากระบบ
function logout() {
    localStorage.removeItem('current_user');
}

// ฟังก์ชั่นจัดการคำขอ
function getClaims() {
    const saved = localStorage.getItem('my_claims');
    if (saved) return JSON.parse(saved);
    
    const initialData = [
        { id: "SV-2025008", type: "ค่ารักษาพยาบาล", date: "12 มี.ค. 2568", amount: "5,000", status: "รอตรวจสอบ", emp: "นนท์ วัฒนกิจ" },
        { id: "SV-2025007", type: "ค่าเล่าเรียนบุตร", date: "10 มี.ค. 2568", amount: "8,000", status: "กำลังดำเนินการ", emp: "สมชาย ใจดี" },
        { id: "SV-2025006", type: "ค่ารักษาพยาบาล", date: "5 มี.ค. 2568", amount: "3,000", status: "อนุมัติแล้ว", emp: "วิภา รักษ์ไทย" },
        { id: "SV-2025005", type: "ค่ารักษาพยาบาล", date: "28 ก.พ. 2568", amount: "4,500", status: "อนุมัติแล้ว", emp: "นนท์ วัฒนกิจ" },
        { id: "SV-2025004", type: "ค่าช่วยเหลือพนักงาน", date: "20 ก.พ. 2568", amount: "2,000", status: "อนุมัติแล้ว", emp: "กิตติพงษ์ สุขใจ" }
    ];
    localStorage.setItem('my_claims', JSON.stringify(initialData));
    return initialData;
}

function addClaim(newClaim) {
    const claims = getClaims();
    claims.unshift(newClaim);
    localStorage.setItem('my_claims', JSON.stringify(claims));
}