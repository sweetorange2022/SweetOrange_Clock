function updateDateTime() {
    const days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let now = new Date();
    let date = now.getFullYear() + '年 ' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
    let day = days[now.getDay()];
    document.getElementById("date").innerText = date + ' ' + day;
    let time = now.getHours().toString().padStart(2, "0") + ':' +
        now.getMinutes().toString().padStart(2, "0") + ':' +
        now.getSeconds().toString().padStart(2, "0");
    document.getElementById("time").innerText = time;
}

function updateCountdown() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let dayOfWeek = today.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
        document.getElementById("countdown").innerText = '周末愉快！';
    } else if (dayOfWeek === 5) {
        document.getElementById("countdown").innerText = '我说个事:明天，周末！';
    } else {
        let daysUntilWeekend = (6 - dayOfWeek + 7) % 7;
        document.getElementById("countdown").innerText = '距离周末还有' + (daysUntilWeekend - 1) + '天';
    }
}

function update() {
    updateDateTime();
    updateCountdown();
}

function toggleFullScreen() {
    let element = document.documentElement;
    let button = document.getElementById("fullscreen-button");

    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // 进入全屏
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        button.innerText = "退出全屏";
        button.classList.add("hide");
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        button.innerText = "全屏";
        button.classList.remove("hide");
    }
}
let particles = [];

function addParticle(x, y) {
    let particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particles.push(particle);
    document.body.appendChild(particle);
}

function updateParticles(event) {
    let x = event.clientX;
    let y = event.clientY;

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        let dx = particle.offsetLeft + 5 - x;
        let dy = particle.offsetTop + 5 - y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 500) {
            particle.remove();
            particles.splice(i, 1);
            i--;
        } else {
            particle.style.left = particle.offsetLeft - dx / 10 + "px";
            particle.style.top = particle.offsetTop - dy / 10 + "px";
        }
    }
}

let mouseStoppedTimer;

document.addEventListener("mousemove", function(event) {
    addParticle(event.clientX, event.clientY);

    if (mouseStoppedTimer) {
        clearTimeout(mouseStoppedTimer);
    }

    mouseStoppedTimer = setTimeout(function() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].remove();
        }
        particles = [];
    }, 500);
});

document.addEventListener("click", function(event) {
    addParticle(event.clientX, event.clientY);
});
function updateTitle() {
    var now = new Date();
    var date = now.getFullYear() + '年 ' + (now.getMonth() + 1) + '月' + now.getDate()+ '日 ';
    var time = now.getHours().toString().padStart(2, "0") + ':' +
    now.getMinutes().toString().padStart(2, "0") + ':' +
    now.getSeconds().toString().padStart(2, "0");
    document.title = date + ' ' + time;
  }
  setInterval(updateTitle, 1000); // 每秒钟更新标题


setInterval(update, 1000);
