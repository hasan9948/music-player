
const wrapper = document.querySelector(".wrapper")
const img = document.querySelector(".img-box img")
const songname = document.querySelector(".song-name")
const artist = document.querySelector(".artist")
const mainaudio = document.querySelector("#audiomusic")

const playpause = document.querySelector(".play-pause .material-icons")
const next = document.querySelector("#next")
const prev = document.querySelector("#prev")

const bar = document.querySelector(".slide-bar")
const bararea = document.querySelector(".progress-area")
const currentTime = document.querySelector(".current")
const duration = document.querySelector(".duration")

const shuffle = document.querySelector("#repeat-plist")

// music list javascript 
const musiclist = document.querySelector(".music-list")
const morelist = document.querySelector("#moresongs")
const closelist = document.querySelector("#closelist")

// /////////////////////////////
let index = 1

window.addEventListener("load", (e) => {
    musicplayerfuntion(index);
})


// futnion of music player
function musicplayerfuntion(mindex) {
    img.src = `${allmusic[mindex - 1].img}.jpg`
    songname.innerHTML = allmusic[mindex - 1].name
    artist.innerHTML = allmusic[mindex - 1].artist
    mainaudio.src = `${allmusic[mindex - 1].src}`
}

// play music function
function playmusic() {
    mainaudio.play();
    playpause.textContent = "pause"
    playpause.classList.add("playshadow")
}

// stop music funtction 
function stopmusic() {
    mainaudio.pause();
    playpause.textContent = "play_arrow"
    playpause.classList.remove("playshadow")
}

//  event to play button 
playpause.addEventListener("click", () => {

    if (playpause.textContent == "play_arrow") {
        playmusic()
    }
    else {
        stopmusic()
    }
})

// adding event to next button
// next funtion 
function nextmusic() {
    index++;
    index > allmusic.length ? index = 1 : index = index
    musicplayerfuntion(index);
    playmusic()
}

next.addEventListener("click", () => {
    nextmusic()
})

// adding event to prev button
// prev music funtoon
function prevmusic() {
    index--;
    index < 1 ? index = allmusic.length : index = index
    musicplayerfuntion(index);
    playmusic()
}

prev.addEventListener("click", () => {
    prevmusic()
})

//  update the progress bar acording to song time
let minduration = 0
let secduration = 0
mainaudio.addEventListener("timeupdate", (e) => {

    // current time
    let currentsongtime = mainaudio.currentTime;
    let durationtime = mainaudio.duration;
    let seccurrentTime = Math.floor((mainaudio.currentTime % 60))
    let mincurrentTime = Math.floor((mainaudio.currentTime / 60))
    mincurrentTime = mincurrentTime < 10 ? "0" + mincurrentTime : mincurrentTime
    seccurrentTime = seccurrentTime < 10 ? "0" + seccurrentTime : seccurrentTime
    currentTime.textContent = `${mincurrentTime}:${seccurrentTime}`
    // duration 
    minduration = Math.floor(mainaudio.duration / 60)
    secduration = Math.floor(mainaudio.duration % 60)
    if (isNaN(minduration)) {
        minduration = 0
    } if (isNaN(secduration)) {
        secduration = 0
    }
    minduration = minduration < 10 ? "0" + minduration : minduration
    secduration = secduration < 10 ? "0" + secduration : secduration
    duration.textContent = `${minduration}:${secduration}`

    // adjustin width of slide bar

    bar.style.width = `${(currentsongtime / durationtime) * 100}%`
})

//  update the currenttime  acording to barwidth
bararea.addEventListener("click", (e) => {
    let progresswidth = bararea.clientWidth
    let clickedoffset = e.offsetX
    let songduration = mainaudio.duration
    mainaudio.currentTime = ((clickedoffset / progresswidth) * songduration)
    playmusic()
})

// adding event to shaffle button 
shuffle.addEventListener("click", () => {
    let text = shuffle.textContent
    switch (text) {
        case "repeat":
            shuffle.textContent = "repeat_one"
            shuffle.setAttribute("title", "song looped")
            break;
        case "repeat_one":
            shuffle.textContent = "shuffle"
            shuffle.setAttribute("title", "playback shuffle")
            break;
        case "shuffle":
            shuffle.textContent = "repeat"
            shuffle.setAttribute("title", "playlist looped")
            break;
    }
})

// adding funtionnality to shuffle button
mainaudio.addEventListener("ended", () => {
    let text = shuffle.textContent
    switch (text) {
        case "repeat":
            nextmusic()
            break;

        case "repeat_one":
            mainaudio.currentTime = 0
            musicplayerfuntion(index);
            playmusic()
            break;

        case "shuffle":
            let randomindex = Math.floor(Math.random() * allmusic.length) + 1
            do {
                randomindex = Math.floor(Math.random() * allmusic.length) + 1
                console.log(randomindex)
            } while (index == randomindex)
            index = randomindex;
            musicplayerfuntion(index);
            playmusic()
            break;
    }
})



// adding event to musiclist buton 
morelist.addEventListener("click", () => {
    musiclist.classList.toggle("close-music")

});

// close list 
closelist.addEventListener("click", () => {
    musiclist.classList.add("close-music")
    console.log("hass")
});


// naming the list items
const ul = document.querySelector("ul")
// making list
for (let i = 0; i < allmusic.length; i++) {
    let newli = document.createElement("li")
    let li = `
<div class="row">
    <span>${allmusic[i].name}</span>
    <p>${allmusic[i].artist}</p>
</div>
<audio id="${allmusic[i].src}"  src="${allmusic[i].src}" ></audio>
<span id="${allmusic[i].src}span" class="audio-duration ${allmusic[i].src}">0</span>
`
    newli.innerHTML = li
    ul.append(newli)

    let liadudiotagduration = document.getElementById(`${allmusic[i].src}span`)
    let liadudiotag = document.getElementById(`${allmusic[i].src}`)
    // console.log(liadudiotagduration)

    liadudiotag.addEventListener("loadeddata", function () {
        minduration = Math.floor(liadudiotag.duration / 60)
        secduration = Math.floor(liadudiotag.duration % 60)
        if (isNaN(minduration)) {
            minduration = 0
        } if (isNaN(secduration)) {
            secduration = 0
        }
        minduration = minduration < 10 ? "0" + minduration : minduration
        secduration = secduration < 10 ? "0" + secduration : secduration
        liadudiotagduration.innerHTML = `${minduration}:${secduration}`

    })

}



playing = document.querySelectorAll("ul li")
playing.forEach((element, i) => {
    element.addEventListener("click", (e) => {
        playing.forEach(element => {
            element.classList.remove("playing")

        });
        element.classList.add("playing")
        index = i + 1
        musicplayerfuntion(index);
        playmusic()
        musiclist.classList.add("close-music")
    })
});

// theme
const theme=document.querySelector(".theme")
const toggle=document.querySelector(".toggle")

const root=document.querySelector(":root")

toggle.addEventListener("click",()=>{
    theme.classList.toggle("activate")
    if(theme.classList.contains("activate")){
        root.style.setProperty('--white',"#111")
        root.style.setProperty('--pink',"#0f0")
        root.style.setProperty('--violet',"cyan")
        root.style.setProperty('--pinkshadow',"#0f0")
    }
    else{
        root.style.setProperty('--white',"#fff")
        root.style.setProperty('--pink',"#ff74a4")
        root.style.setProperty('--violet',"#9f6ea3")
        root.style.setProperty('--pinkshadow',"#ffcbdd")
    }
})