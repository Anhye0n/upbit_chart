const contents_title = document.getElementsByClassName('article_box_title')
const contents_text = document.getElementsByClassName('article_box_content')

// document.getElementById('left_top_title').setAttribute('onclick', "location.href='http://158.247.197.13/'")

const contents_title_length = contents_title.length
const contents_text_length = contents_text.length

for (i = 0; i < contents_title_length; i++) {
    const contents_title_contents = contents_title[i].innerText
    const contents_title_contents_length = contents_title_contents.length

    if (contents_title_contents_length > 11) {
        contents_title[i].innerText = contents_title_contents.substr(0, 11) + ' ...'
    }
}
for (i = 0; i < contents_text_length; i++) {
    const contents_text_contents = contents_text[i].innerText
    const contents_text_contents_length = contents_text_contents.length

    if (contents_text_contents_length > 153) {
        contents_text[i].innerText = contents_text_contents.substr(0, 153) + ' ...'
    }
}

const right_content = document.getElementById('right_content');

let today = new Date();
month = today.getMonth() + 1;
date = today.getDate();

if ((month - 1) < 10) {
    month = '0' + month.toLocaleString();
}
if (date < 10) {
    date = '0' + date.toLocaleString();
}
right_content.innerText = today.getFullYear() + '-' + month + '-' + date

const menu_box = document.getElementById('box_left');

function menu_open(){
    menu_box.style.display  = 'block'
}

function menu_close(){
    menu_box.style.display = 'none'
}

window.onresize = function (){
    let innerWidth = window.innerWidth;
    if (innerWidth > 1200){
        menu_box.style.display  = 'block'
    }else {
        menu_box.style.display  = 'none'
    }
}