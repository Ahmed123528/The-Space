<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Space - Login</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <style>
        .background {
            background: url('background.gif') no-repeat center center fixed;
            background-size: cover;
            width: 100%;
            height: 100vh;
            position: relative;
            z-index: -1;
        }
        .container {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .login-box {
            background: rgba(0, 0, 0, 0.7);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            animation: fadeInDown 1s;
        }
        .btn-google {
            background: white;
            color: #4285F4;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        .btn-google:hover {
            background: #ddd;
        }
    </style>
</head>
<body>
    <div class="background"></div>
    <div class="container">
        <div class="login-box animate__animated animate__fadeInDown">
            <h1 class="display-4">Welcome to The Space</h1>
            <p>Your ultimate destination for virtual meetings.</p>
            <div id="buttonDiv"></div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <script src="https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.min.js"></script>
    <script>
        function handleCredentialResponse(response) {
            const data = jwt_decode(response.credential);
            console.log(data);
            // هنا يمكنك إعادة توجيه المستخدم أو تنفيذ أي منطق تريد
            window.location.href = "main.html";
        }

        window.onload = function () {
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID', // استبدل YOUR_GOOGLE_CLIENT_ID بمعرف العميل الخاص بك
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById('buttonDiv'), {
                    theme: 'outline',
                    size: 'large'
                }
            );
            google.accounts.id.prompt(); // عرض مطالبة تسجيل الدخول تلقائيًا
        };
    </script>
</body>
</html>
