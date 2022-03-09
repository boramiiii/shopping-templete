

//json 에서 아이템 받아오기
function loadItems(){
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

//리스트 업데이트
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

//버튼 클릭시 필터링
function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(key == null || value == null){
        return;
    }
    const filtered = items.filter(item => item[key] === value);
    console.log(filtered);
    displayItems(filtered);
}

//버튼 클릭시 필터링 다른방법
// function onButtonClick(event, items){
//     const dataset = event.target.dataset;
//     const key = dataset.key;
//     const value = dataset.value;
    
//     if(key == null || value == null){
//         return;
//     }

//     updateItems(items, key, value);
// }

// function updateItems(items, key, value){
//     items.forEach(item => {
//         if(items.dataset[key] === value){
//             item.classList.remove('invisible');
//         }else{
//             item.classList.add('invisible');
//         }
//     });
// }

function setEventListner(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', ()=> displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items))
}


loadItems()
.then(items =>{
    console.log(items);
    displayItems(items);
    setEventListner(items);
})
.catch(console.log);