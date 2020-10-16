const openBtn = document.getElementById('btnToOpen');
const closeBtn = document.getElementById('btnToClose');
const div = document.getElementsByClassName('js-d-none')[0];

openBtn.addEventListener('click', (event)=>{ 
    openBtn.classList.toggle('js-d-none');
    div.classList.toggle('js-d-none');
});
closeBtn.addEventListener('click', (event)=>{ 
    openBtn.classList.toggle('js-d-none');
    div.classList.toggle('js-d-none');
});

