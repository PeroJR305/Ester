/* =====================================================
   ROBLOX CODE SHOP
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   LOCAL STORAGE
===================================================== */

let users =
    JSON.parse(
        localStorage.getItem("robloxUsers")
    ) || [];


let currentUser =
    JSON.parse(
        localStorage.getItem("currentRobloxUser")
    ) || null;



/* =====================================================
   SAVE DATA
===================================================== */

function saveUsers() {

    localStorage.setItem(
        "robloxUsers",
        JSON.stringify(users)
    );

}


function saveCurrentUser() {

    if (currentUser) {

        localStorage.setItem(
            "currentRobloxUser",
            JSON.stringify(currentUser)
        );

    }

}



/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateUI();

        setupLogin();

        setupRegister();

    }
);



/* =====================================================
   UPDATE HOME PAGE
===================================================== */

function updateUI() {

    const guestButtons =
        document.getElementById(
            "guestButtons"
        );


    const userButtons =
        document.getElementById(
            "userButtons"
        );


    const welcomeMessage =
        document.getElementById(
            "welcomeMessage"
        );


    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    if (currentUser) {

        /* Username */

        const usernameDisplay =
            document.getElementById(
                "usernameDisplay"
            );


        const welcomeUsername =
            document.getElementById(
                "welcomeUsername"
            );


        if (usernameDisplay) {

            usernameDisplay.textContent =
                currentUser.username;

        }


        if (welcomeUsername) {

            welcomeUsername.textContent =
                currentUser.username;

        }



        /* Balance */

        const balance =
            currentUser.balance || 0;


        const balanceDisplay =
            document.getElementById(
                "balanceDisplay"
            );


        const accountBalance =
            document.getElementById(
                "accountBalance"
            );


        if (balanceDisplay) {

            balanceDisplay.textContent =
                balance;

        }


        if (accountBalance) {

            accountBalance.textContent =
                balance;

        }



        /* Login buttons */

        if (guestButtons) {

            guestButtons.classList.add(
                "hidden"
            );

        }


        if (userButtons) {

            userButtons.classList.remove(
                "hidden"
            );

        }


        if (welcomeMessage) {

            welcomeMessage.classList.remove(
                "hidden"
            );

        }


        if (loginMessage) {

            loginMessage.classList.add(
                "hidden"
            );

        }

    }


    else {

        if (guestButtons) {

            guestButtons.classList.remove(
                "hidden"
            );

        }


        if (userButtons) {

            userButtons.classList.add(
                "hidden"
            );

        }


        if (welcomeMessage) {

            welcomeMessage.classList.add(
                "hidden"
            );

        }


        if (loginMessage) {

            loginMessage.classList.remove(
                "hidden"
            );

        }

    }

}



/* =====================================================
   REGISTER
===================================================== */

function setupRegister() {

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (!registerForm) {

        return;

    }


    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                document.getElementById(
                    "registerUsername"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const terms =
                document.getElementById(
                    "terms"
                );



            /* ตรวจสอบข้อมูล */

            if (
                username === "" ||
                email === "" ||
                password === ""
            ) {

                alert(
                    "กรุณากรอกข้อมูลให้ครบ"
                );

                return;

            }


            if (
                password !==
                confirmPassword
            ) {

                alert(
                    "รหัสผ่านไม่ตรงกัน"
                );

                return;

            }


            if (
                !terms ||
                !terms.checked
            ) {

                alert(
                    "กรุณายอมรับเงื่อนไขการใช้งาน"
                );

                return;

            }



            /* ตรวจ Username ซ้ำ */

            const usernameExists =
                users.some(
                    function (user) {

                        return (
                            user.username
                                .toLowerCase() ===
                            username
                                .toLowerCase()
                        );

                    }
                );


            if (usernameExists) {

                alert(
                    "Username นี้ถูกใช้งานแล้ว"
                );

                return;

            }



            /* ตรวจ Email ซ้ำ */

            const emailExists =
                users.some(
                    function (user) {

                        return (
                            user.email
                                .toLowerCase() ===
                            email
                                .toLowerCase()
                        );

                    }
                );


            if (emailExists) {

                alert(
                    "Email นี้ถูกใช้งานแล้ว"
                );

                return;

            }



            /* สร้างบัญชี */

            const newUser = {

                username:
                    username,

                email:
                    email,

                password:
                    password,

                balance:
                    0,

                trialClaimed:
                    false,

                orders:
                    []

            };


            users.push(
                newUser
            );


            saveUsers();



            /*
               Register สำเร็จ
               → Login
            */

            alert(
                "สมัครสมาชิกสำเร็จ!\nกรุณาเข้าสู่ระบบ"
            );


            window.location.href =
                "login.html";

        }
    );

}



/* =====================================================
   LOGIN
===================================================== */

function setupLogin() {

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (!loginForm) {

        return;

    }


    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const loginInput =
                document.getElementById(
                    "loginUsername"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;



            /* ค้นหา User */

            const user =
                users.find(
                    function (item) {

                        const usernameMatch =
                            item.username
                                .toLowerCase() ===
                            loginInput
                                .toLowerCase();


                        const emailMatch =
                            item.email
                                .toLowerCase() ===
                            loginInput
                                .toLowerCase();


                        const passwordMatch =
                            item.password ===
                            password;


                        return (
                            (
                                usernameMatch ||
                                emailMatch
                            )
                            &&
                            passwordMatch
                        );

                    }
                );



            /* Login ไม่สำเร็จ */

            if (!user) {

                alert(
                    "Username/Email หรือ Password ไม่ถูกต้อง"
                );

                return;

            }



            /* Login สำเร็จ */

            currentUser =
                user;


            saveCurrentUser();


            alert(
                "เข้าสู่ระบบสำเร็จ!\nยินดีต้อนรับ " +
                currentUser.username
            );


            /*
               → หน้าหลัก
            */

            window.location.href =
                "index.html";

        }
    );

}



/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    currentUser =
        null;


    localStorage.removeItem(
        "currentRobloxUser"
    );


    window.location.href =
        "index.html";

}



/* =====================================================
   CUSTOM NOTIFICATION
===================================================== */

function showNotification(
    title,
    message,
    icon = "✓"
) {

    const overlay =
        document.getElementById(
            "notificationOverlay"
        );


    const titleElement =
        document.getElementById(
            "notificationTitle"
        );


    const messageElement =
        document.getElementById(
            "notificationMessage"
        );


    const iconElement =
        document.getElementById(
            "notificationIcon"
        );


    if (!overlay) {

        alert(
            title +
            "\n\n" +
            message.replace(
                /<[^>]*>/g,
                ""
            )
        );

        return;

    }


    titleElement.textContent =
        title;


    messageElement.innerHTML =
        message;


    iconElement.textContent =
        icon;


    overlay.classList.add(
        "show"
    );

}



/* =====================================================
   CLOSE NOTIFICATION
===================================================== */

function closeNotification() {

    const overlay =
        document.getElementById(
            "notificationOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }

}



/* =====================================================
   CLAIM TRIAL POINTS
===================================================== */

function claimTrialPoints() {

    /*
       ยังไม่ได้ Login
       → ไป Login
    */

    if (!currentUser) {

        window.location.href =
            "login.html";

        return;

    }



    /*
       เคยรับแต้มแล้ว
    */

    if (
        currentUser.trialClaimed === true
    ) {

        showNotification(

            "รับแต้มไปแล้ว",

            "บัญชีนี้ได้รับแต้มทดลองใช้ไปแล้ว<br><br>" +

            "ไม่สามารถรับแต้มทดลองซ้ำได้",

            "!"

        );

        return;

    }



    /* จำนวนแต้ม */

    const trialPoints =
        100;



    /* เพิ่มแต้ม */

    currentUser.balance =
        (currentUser.balance || 0)
        +
        trialPoints;


    currentUser.trialClaimed =
        true;



    /* Update users */

    const index =
        users.findIndex(
            function (user) {

                return (
                    user.username ===
                    currentUser.username
                );

            }
        );


    if (index !== -1) {

        users[index] =
            currentUser;

    }



    /* Save */

    saveUsers();

    saveCurrentUser();


    updateUI();



    /* Notification */

    showNotification(

        "ได้รับแต้มสำเร็จ!",

        "🎁 คุณได้รับแต้มทดลองใช้แล้ว<br><br>" +

        "<strong style=\"" +
        "display:block;" +
        "text-align:center;" +
        "font-size:25px;" +
        "color:#ffd83d;" +
        "\">" +

        "+" +
        trialPoints +
        " แต้ม" +

        "</strong><br>" +

        "แต้มของคุณสามารถนำไปซื้อสินค้าได้",

        "★"

    );

}



/* =====================================================
   BUY PRODUCT
===================================================== */

function buyProduct(
    productName,
    price
) {

    /*
       ยังไม่ได้ Login
       → ไป Login
    */

    if (!currentUser) {

        window.location.href =
            "login.html";

        return;

    }



    const balance =
        currentUser.balance || 0;



    /*
       แต้มไม่พอ
    */

    if (
        balance < price
    ) {

        showNotification(

            "แต้มไม่เพียงพอ",

            "สินค้านี้ราคา " +

            "<strong>" +
            price +
            " แต้ม</strong><br><br>" +

            "แต้มปัจจุบันของคุณ: " +

            "<strong style=\"" +
            "color:#ffd83d;" +
            "\">" +

            balance +
            " แต้ม" +

            "</strong><br><br>" +

            "กด <strong>รับแต้มทดลอง</strong> " +
            "เพื่อรับแต้มฟรี",

            "!"

        );

        return;

    }



    /*
       สร้าง Code
    */

    const code =
        generateCode();



    /*
       หักแต้ม
    */

    currentUser.balance =
        balance -
        price;



    /*
       สร้าง Order
    */

    const order = {

        product:
            productName,

        price:
            price,

        code:
            code,

        date:
            new Date().toLocaleString(
                "th-TH"
            )

    };


    if (
        !Array.isArray(
            currentUser.orders
        )
    ) {

        currentUser.orders =
            [];

    }


    currentUser.orders.push(
        order
    );



    /*
       Update Users
    */

    const index =
        users.findIndex(
            function (user) {

                return (
                    user.username ===
                    currentUser.username
                );

            }
        );


    if (index !== -1) {

        users[index] =
            currentUser;

    }



    /* Save */

    saveUsers();

    saveCurrentUser();


    updateUI();



    /*
       แสดง Notification
    */

    showNotification(

        "ซื้อสินค้าสำเร็จ!",

        "สินค้า: " +

        "<strong>" +
        productName +
        "</strong><br>" +

        "ราคา: " +

        "<span style=\"" +
        "color:#ffd83d;" +
        "\">⭐ " +
        price +
        " แต้ม</span><br><br>" +

        "แต้มคงเหลือ: " +

        "<span style=\"" +
        "color:#ffd83d;" +
        "\">" +

        currentUser.balance +
        " แต้ม</span><br><br>" +

        "รหัสสินค้าของคุณ:" +

        "<span class=\"code\">" +
        code +
        "</span>",

        "✓"

    );

}



/* =====================================================
   GENERATE CODE
===================================================== */

function generateCode() {

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    function createPart() {

        let result = "";


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            result +=
                characters.charAt(
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                );

        }


        return result;

    }


    return (

        createPart() +
        "-" +
        createPart() +
        "-" +
        createPart() +
        "-" +
        createPart()

    );

}



/* =====================================================
   ORDER HISTORY
===================================================== */

function showHistory() {

    /*
       ยังไม่ได้ Login
    */

    if (!currentUser) {

        window.location.href =
            "login.html";

        return;

    }



    const historyBox =
        document.getElementById(
            "historyBox"
        );


    const historyList =
        document.getElementById(
            "historyList"
        );


    if (
        !historyBox ||
        !historyList
    ) {

        return;

    }


    historyList.innerHTML =
        "";



    /*
       ไม่มีประวัติ
    */

    if (
        !currentUser.orders ||
        currentUser.orders.length === 0
    ) {

        historyList.innerHTML =

            "<div style=\"" +
            "text-align:center;" +
            "padding:30px;" +
            "color:#777;" +
            "\">" +

            "ยังไม่มีประวัติการสั่งซื้อ" +

            "</div>";

    }


    /*
       มีประวัติ
    */

    else {

        currentUser.orders
            .slice()
            .reverse()
            .forEach(
                function (order) {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "history-item";


                    item.innerHTML =

                        "<strong>" +

                        order.product +

                        "</strong><br>" +

                        "ราคา: " +

                        "<span>" +

                        order.price +

                        " แต้ม" +

                        "</span><br>" +

                        "Code: " +

                        "<span>" +

                        order.code +

                        "</span><br>" +

                        "วันที่: " +

                        order.date;


                    historyList.appendChild(
                        item
                    );

                }
            );

    }


    historyBox.classList.remove(
        "hidden"
    );

}



/* =====================================================
   CLOSE HISTORY
===================================================== */

function closeHistory() {

    const historyBox =
        document.getElementById(
            "historyBox"
        );


    if (historyBox) {

        historyBox.classList.add(
            "hidden"
        );

    }

}



/* =====================================================
   SCROLL PRODUCTS
===================================================== */

function scrollToProducts() {

    const products =
        document.getElementById(
            "products"
        );


    if (products) {

        products.scrollIntoView({

            behavior:
                "smooth"

        });

    }

}



/* =====================================================
   CLICK OUTSIDE NOTIFICATION
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const overlay =
            document.getElementById(
                "notificationOverlay"
            );


        if (
            overlay &&
            event.target === overlay
        ) {

            closeNotification();

        }

    }
);



/* =====================================================
   ESC CLOSE
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeNotification();

        }

    }
);