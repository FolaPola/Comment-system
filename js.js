'use strict';
let comments = [];
loadComments();

//валидация 
commentname.onblur = function() {
    if (commentname.value == ('')) { // 
      error.innerHTML = 'Пожалуйста, введите имя.'
  }
  }
  commentname.onfocus = function() {
      error.innerHTML = "";
  };

  commentbody.onblur = function() {
    if (commentbody.value == ('')) { // 
      error1.innerHTML = 'Нельзя отправить пустой комментарий.'
  }
  }
  commentbody.onfocus = function() {
      error1.innerHTML = "";
  };

//вешаем событие на кнопку
document.getElementById('comment-add').onclick = function(){
    //вытаскиваем комментарии из формы
    let commentName = document.getElementById('commentname');
    let commentBody = document.getElementById('commentbody');
    let commentData = document.getElementById('commentdata');
 
    let comment = { //массив комментария
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000), //задали время комментария*/
        data: commentData.value,
       
    }
    //очищаем форму
    commentName.value = '';
    commentBody.value = '';
    commentData.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){ //сохраняем комментарий
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){//выводим на экран
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<p class="text-right small"><em>${item.data}</em></p>`;
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">${item.name}</p>`;
        out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
        
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let hour = (a.getHours() < 10 ? "0" : "") + a.getHours();
    let min = (a.getMinutes() < 10 ? "0" : "") + a.getMinutes();
    let time = hour + ':' + min;
    return time;
  }
