//var toggler = document.getElementById('main-nav__toggle');
//toggler.onclick = function (e) {
//    e.preventDefault();
//    toggler.classList.toggle('main-nav__toggle--close');
//}
(function () {
    if (!("FormData" in window)) {
        return;
    }
    var form = document.querySelector(".form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var data = new FormData(form);
        request(data, function (response) {
            console.log(response);
        });
    });

    function request(data, fn) {
        var xhr = new XMLHttpRequest();
        var time = (new Date()).getTime();
        xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState == 4) {
                fn(xhr.responseText);
            }
        });
        xhr.send(data);
    }

    if ("FileReader" in window) {
        var area = document.querySelector(".upload-list");
        form.querySelector("#file").addEventListener("change", function () {
            var files = this.files;
            for (var i = 0; i < files.length; i++) {
                preview(files[i]);
            }
        });

        function preview(file) {
            if (file.type.match(/image.*/)) {
                var reader = new FileReader();
                reader.addEventListener("load", function (event) {
                    var img = document.createElement("img");
                    img.src = event.target.result;
                    img.alt = file.name;
                    img.width = 48;
                    img.className = "upload-list__img";
                    area.appendChild(img);
                });
                reader.readAsDataURL(file);
            }

        }
    }


})();

function addone(i) {
    inp = document.getElementById("inp");
    inp.value = parseInt(inp.value) + i + ' чел';
    if (parseInt(inp.value) <= 1) {
        inp.value = 1 + ' чел';
    }
}
