export const template = `<html>

<head>
    <title>Message HTML Title</title>
</head>

<body>
    <div>
        <p>
            danke, dass Du dir eine unserer Challenges für {{weeks}} Woche{{plural}} vorgenommen hattest. 
         </p>

        <p>
            <span>{{challengeTitle}}</span>
        </p>
        <p>
            <span>{{challengeText}}</span>
        </p>
        <p>
            <span>Herzliche Grüße vom climactivity-Team</span>
        </p>

        <hr>
        <a href="https://climactivity.de/">climactivity.de</a>

    </div>
</body>

</html>`