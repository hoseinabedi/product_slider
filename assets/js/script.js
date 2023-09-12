const slider = document.querySelector(".slider"),
firstCard = slider.querySelectorAll(".card")[0],
dots = document.querySelector(".dots");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff, dotsNumber, slideNumber = 0;

const autoSlide = () => {
    // if there is no card left to scroll then return from here
    if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;

    let firstCardWidth = firstCard.clientWidth + 14;
    if(slider.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return slider.scrollLeft = Math.ceil(slider.scrollLeft / firstCardWidth) * firstCardWidth;
    }
    // if user is scrolling to the left
    slider.scrollLeft = Math.floor(slider.scrollLeft / firstCardWidth) * firstCardWidth;
}

const dragStart = (e) => {
    // updating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    // scrolling cards to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    slider.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
    checkScrollPosition();
}

const checkScrollPosition = () => {
    setTimeout(() => {
        if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 ) changeActiveDot("dot"+(dotsNumber-1));
        else if(slider.scrollLeft < (slideNumber) * slider.clientWidth || slider.scrollLeft >= (slideNumber+1) * (slider.clientWidth)){
            for(var i=0; i<dotsNumber; i++){
                if(slider.scrollLeft > i*(slider.clientWidth) && slider.scrollLeft < (i+1)*(slider.clientWidth)) changeActiveDot("dot"+i);
            }
        }
        return;
    }, 500);
}

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
slider.addEventListener("touchend", dragStop);


const changeSlideWithDots = (e) => {
    changeActiveDot(e.target.id);
    slider.scrollLeft = slideNumber*(slider.clientWidth+14);
}

const changeActiveDot = (id) => {
    console.log(id);
    slideNumber = Number(id.slice(3));
    document.querySelector(".dots .active").classList.remove('active');
    document.getElementById(id).classList.add("active");
}

const makeDots = () => {
    var number = slider.scrollWidth / (slider.clientWidth+14);
    var rounded = Math.round(number * 10) / 10;
    dotsNumber = Math.ceil(rounded);
    dots.style.transform = `translateX(-${dotsNumber/2}rem)`;
    var dot = "";
    for(var i = 0; i < dotsNumber; i++){
        dot = document.createElement("span");
        dot.setAttribute("id", "dot"+(i));
        if(i === 0) dot.setAttribute("class", "active");
        dot.onclick = changeSlideWithDots;
        dots.appendChild(dot);
    }
}

makeDots();