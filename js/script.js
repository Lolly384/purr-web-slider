let key = true;
let MyInterval;
let width = 0;
let startDot = 0;
let countElement = 0;
let list;
let widthItem = 0;
let slider = document.querySelector(".slider");
let track;
let btnNext;
let btnPrev;
let active;
let dots;
//-----------------------------------------------------------
//Функция перехода по нажатию точки
const dotMove = (namber) =>{
    let endDot = namber;
    if(startDot < endDot){
       let start = width;
       let end = width - (widthItem * (endDot-startDot));
       if(key){
        MyInterval = setInterval(() => {
          key = false;
          start -= 5;
          track.style.left = start + 'px';
          if(start == end){
            startDot = endDot
            width = end;
            key = true;
            clearInterval(MyInterval);
          }
        });
       }
    }
    else if(startDot > endDot){
      let start = width;
      let end = width + (widthItem * (startDot-endDot));
      if(key){
        MyInterval = setInterval(() => {
          key = false;
          start += 5;
          track.style.left = start + 'px';
          if(start == end){
            startDot = endDot
            width = end;
            key = true;
            clearInterval(MyInterval);
          }
        });
      }
    }
    else{

    }
}
// // Создание клона первого слайда
const addLast = (count) => {
  let firstDiv = document.createElement("div");
  firstDiv.classList.add("slide");
  firstDiv = slider.children[0].cloneNode("true");
  let parentDiv = slider.children[count - 1].parentNode;
  parentDiv.appendChild(firstDiv, slider.children[count - 1]);
};
//Создание клона последнего клона
const addFirst = (count) => {
  let tenDiv = document.createElement("div");
  tenDiv.classList.add("slide");
  tenDiv = slider.children[count - 1].cloneNode("true");
  let parentDiv = slider.children[0].parentNode;

  parentDiv.insertBefore(tenDiv, slider.children[0]);
};

const createSlider = () => {
  countElement = slider.children.length;
  widthItem = slider.children[0].clientWidth;
  list = document.createElement("div");
  list.classList.add("list");

  track = document.createElement("div");
  track.classList.add("track");
  addLast(countElement);
  addFirst(countElement);

  Array.from(slider.children).forEach((elem) => {
    track.appendChild(elem);
  });

  list.appendChild(track);
  slider.appendChild(list);

};

const createButton = () => {
  btnPrev = document.createElement("button");
  let imgLeft = document.createElement("img");
  imgLeft.src = 'img/left.png';
  btnPrev.appendChild(imgLeft);
  btnPrev.classList.add("btnPrev");
  slider.appendChild(btnPrev);

  btnNext = document.createElement("button");
  btnNext.classList.add("btnNext");
  let imgRight = document.createElement("img");
  imgRight.src = 'img/right.png';
  btnNext.appendChild(imgRight);
  slider.appendChild(btnNext);
};

const createDots = () => {
  dots = document.createElement("div");
  dots.classList.add("slider-dots")
  for(let i = 0; i<countElement; i++){
    let dot = document.createElement("span");
    dot.classList.add("slider-dots_item");
    if(i == 0){
      dot.classList.add("active");
    }
    dots.appendChild(dot);
  }
  slider.appendChild(dots);
}

const clickNextButton =() =>{
  btnNext.addEventListener("click", () => {
    let start = width;
    let end = width - widthItem;
    if (key) {
      MyInterval = setInterval(() => {
        key = false;
        start -= 5;
        track.style.left = start + "px";
        if (start == -(widthItem*countElement)) {
          start = 0;
          width = 0;
          startDot = 0;
  
          track.style.left = start + "px";
  
          for(let i = 0; i<dots.children.length; i++){
            if(dots.children[i].classList.contains("active")){
              dots.children[i].classList.remove("active");
            }
          }
          
          dots.children[startDot].classList.add("active");
  
          key = true;
          clearInterval(MyInterval);
        }
        if (start == end) {
          width = end;
  
          for(let i = 0; i<dots.children.length; i++){
            if(dots.children[i].classList.contains("active")){
                dots.children[i].classList.remove("active");
            }
          }
          startDot = startDot + 1;
          dots.children[startDot].classList.add("active");
  
          key = true;
          clearInterval(MyInterval);
        }
      }, 1);
    }
  });
}

const clickPrevButton = () =>{
  btnPrev.addEventListener("click", () => {
    let start = width;
    let end = width + widthItem;
    if (key) {
      MyInterval = setInterval(() => {
        key = false;
        start += 5;
        track.style.left = start + "px";
        if (start == 560) {
          start = -(widthItem*(countElement-1));
          width = -(widthItem*(countElement-1));
          startDot = dots.children.length-1;
          
          track.style.left = start + "px";
  
          for(let i = 0; i<dots.children.length; i++){
            if(dots.children[i].classList.contains("active")){
              dots.children[i].classList.remove("active");
            }
          }
          
          dots.children[startDot].classList.add("active");
  
          key = true;
          clearInterval(MyInterval);
        }
        if (start == end) {
          width = end;
  
          for(let i = 0; i<dots.children.length; i++){
            if(dots.children[i].classList.contains("active")){
              dots.children[i].classList.remove("active");
            }
          }
          startDot = startDot - 1;
          dots.children[startDot].classList.add("active");
  
          key = true;
          clearInterval(MyInterval);
        }
      }, 1);
    }
  });
}
const clickDots = () =>{
  Array.from(dots.children).forEach((elem,index) =>{
    elem.addEventListener("click", () =>{
      dotMove(index);
      if(key){
          key = false;
          for(let i = 0; i<dots.children.length; i++){
            if(dots.children[i].classList.contains("active")){
              dots.children[i].classList.remove("active");
             
            }
          }
          dots.children[index].classList.add("active");
          startDot = index;
          key = true;
      }
  });
  })
}

createSlider();
createButton();
createDots();
clickDots();
clickNextButton();
clickPrevButton();

//-----------------------------------------------------------
