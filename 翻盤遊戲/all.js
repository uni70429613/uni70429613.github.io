const poker_data = [
    {
        pic_src: "./img/1.png",
        value: 1
    },
    {
        pic_src: "./img/1.png",
        value: 1
    },
    {
        pic_src: "./img/2.png",
        value: 2
    },
    {
        pic_src: "./img/2.png",
        value: 2
    },
    {
        pic_src: "./img/3.png",
        value: 3
    },
    {
        pic_src: "./img/3.png",
        value: 3
    },
    {
        pic_src: "./img/4.png",
        value: 4
    },
    {
        pic_src: "./img/4.png",
        value: 4
    },
    {
        pic_src: "./img/5.png",
        value: 5
    },
    {
        pic_src: "./img/5.png",
        value: 5
    },
    {
        pic_src: "./img/6.png",
        value: 6
    },
    {
        pic_src: "./img/6.png",
        value: 6
    },
    {
        pic_src: "./img/7.png",
        value: 7
    },
    {
        pic_src: "./img/7.png",
        value: 7
    },
    {
        pic_src: "./img/8.png",
        value: 8
    },
    {
        pic_src: "./img/8.png",
        value: 8
    },
    {
        pic_src: "./img/9.png",
        value: 9
    },
    {
        pic_src: "./img/9.png",
        value: 9
    },
    {
        pic_src: "./img/10.png",
        value: 10
    },
    {
        pic_src: "./img/10.png",
        value: 10
    },
    {
        pic_src: "./img/11.png",
        value: 11
    },
    {
        pic_src: "./img/11.png",
        value: 11
    },
    {
        pic_src: "./img/12.png",
        value: 12
    },
    {
        pic_src: "./img/12.png",
        value: 12
    },
    {
        pic_src: "./img/13.png",
        value: 13
    },
    {
        pic_src: "./img/13.png",
        value: 13
    },
    {
        pic_src: "./img/14.png",
        value: 14
    },
    {
        pic_src: "./img/14.png",
        value: 14
    },
]

//隨機排序
data = [];
let cont_num = poker_data.length;

for (i = 0; i < 28; i++) {
    let rand = Math.floor(Math.random() * (cont_num - 1) + 0);
    let card = poker_data.splice((rand % (cont_num + 1)), 1);
    data.push(card);
    cont_num -= 1;
}



// 第一次
let str = '';
let str2 = '';
let data_pic = [];
for (i = 0; i < 28; i++) {
    str += `<img src="./img/0.png" alt="" value="${data[i][0].value}" data-num=${i} style="margin:10px; width: 18%;height: 18%;">`
    str2 = `<img src="./img/0.png" alt="" value="${data[i][0].value}" data-num=${i} style="margin:10px; width: 18%;height: 18%;">`
    data_pic.push(str2)
}
block.innerHTML = str;

// 重新渲染牌

let selected_card = []
function renderdata() {
    let re_str = '';
    for (i = 0; i < data_pic.length; i++) {
        let selected = false;
        for (j = 0; j < selected_card.length; j++) {
            if (i == selected_card[j]) {
                selected = true;

                break;
            }
        }
        if (selected) {

            re_str += `<img src="./img/${data[i][0].value}.png" alt="" value="${data[i][0].value}" data-num=${i} style="margin:10px; width: 18%;height: 18%;">`
        }
        else {
            re_str += `<img src="./img/0.png" alt="" value="${data[i][0].value}" data-num=${i} style="margin:10px; width: 18%;height: 18%;">`
        }
    }
    block.innerHTML = re_str;
}

//end
function end() {
    let win = 0;
    selected_card.sort();
    if (selected_card.length > 0) {
        for (i = 1; i < selected_card.length; i++) {
            if (selected_card[i] == selected_card[i - 1]) {
                selected_card.splice(i, 1)
            }
        }
        for (j = 0; j < selected_card.length; j++) {
            win += Number(selected_card[j]);
        }
    }
    console.log(selected_card)
    console.log(win)
    if (win == 378) {
        setTimeout(() => {
            alert('GG~人生又浪費在糞game上');
        }, 2000);
    }
}

//測試3
let bingo = 0;
const pic_test = document.getElementById("block");
let compare = function () {
    renderdata()
    let times = 2;
    let number = [];

    pic_test.addEventListener("click", function (e) {

        if (e.target.nodeName == 'IMG' && times > 0) {

            $(e.target).toggleClass('animate__animated animate__flipInX')
            e.target.setAttribute("src", `./img/${e.target.getAttribute("value")}.png`)
            times -= 1;
            number.push(e.target.getAttribute("value"));
            selected_card.push(e.target.getAttribute('data-num'))

            if (times < 1) {
                if (number[0] == number[1]) {
                    bingo += 1;
                    if (bingo >= 14) {
                        end()
                    }
                }
                else {
                    selected_card.pop();
                    selected_card.pop();

                }
                setTimeout(() => {
                    compare()
                }, 1000);

            }
        }
    })
}


compare()