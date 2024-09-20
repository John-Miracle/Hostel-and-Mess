function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}


// // Load text from files when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     // Specify the paths to your text files and target element ids
//     const files = ['./Text/AI.txt', './Text/Hostel.txt', './Text/Calculator.txt', './Text/Navigation.txt', './Text/PlayO.txt', './Text/Community.txt'];
//     const targetElementIds = ['text-content-1', 'text-content-2', 'text-content-3', 'text-content-4', 'text-content-5', 'text-content-6'];
    
//     // Load text from each file and update the corresponding element
//     files.forEach((file, index) => {
//         loadTextFromFile(file, targetElementIds[index]);
//     });
// });

// function navigateToPage(page) {
//     window.location.href = page;
// }

document.addEventListener('DOMContentLoaded', function() {
    // document.getElementById("AI").addEventListener("click", function() {
    //     navigateToPage("Scripts/ChatBot.html");
    // });

    // document.getElementById("Hostel").addEventListener("click", function() {
    //     navigateToPage("Scripts/Hostel.html");
    // });

    // document.getElementById("Calculate").addEventListener("click", function() {
    //     navigateToPage("Scripts/Calculator.html");
    // });

    // document.getElementById("Navigation").addEventListener("click", function() {
    //     navigateToPage("Scripts/Navigation.html");
    // });

    // document.getElementById("PlayO").addEventListener("click", function() {
    //     navigateToPage("Scripts/PlayO.html");
    // });

    // document.getElementById("Community").addEventListener("click", function() {
    //     navigateToPage("Scripts/Community.html");
    // });

    // let dropdown = document.querySelector('.dropdown');
    // dropdown.onclick = function(){
    //   dropdown.classList.toggle('active');
    // }
    // Get the image and popup
    

    const floor_plan = document.getElementById("floor-plan");
    console.log(floor_plan);
    const popup = document.getElementById("popup");
    floor_plan.addEventListener("click", function() {
        popup.style.display = "flex";
    });
    document.getElementById("close").addEventListener("click", function() {
        popup.style.display = "none";
    });
    window.addEventListener("click", function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    });
    

    const room_image = document.getElementById("room-image");
    console.log(room_image);
    const popup_2 = document.getElementById("popup-room");
    room_image.addEventListener("click", function() {
        popup_2.style.display = "flex";
    });
    document.getElementById("close_2").addEventListener("click", function() {
        popup_2.style.display = "none";
    });
    window.addEventListener("click", function(event) {
        if (event.target == popup_2) {
            popup_2.style.display = "none";
        }
    });   
});


window.onload = function(){
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    closeBtn.addEventListener("click",function(){
        sidebar.classList.toggle("open")
        menuBtnChange()
    })
 
    function menuBtnChange(){
        if(sidebar.classList.contains("open")){
            closeBtn.classList.replace("bx-menu","bx-menu-alt-right")
        }else{
            closeBtn.classList.replace("bx-menu-alt-right","bx-menu")
        }
    }
}



// Modify the show function to send a GET request to the server with the provided index as a query parameter
function show(index) {
    fetch(`/hostelData?index=${index}`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(current);
        let prev = current;
        console.log("hello")
        console.log(prev);
        current = index;
        console.log(current);
        if (prev == current) {
            return;
        }
        const result=data;
        console.log(result);
        const d_list = result.data;

        //Block Picture
        const pic_b = document.querySelector(".p-image");
        const pic = result.B_image;
        pic_b.src = pic;

        //Name
        const t_name = document.querySelector(".b_name");
        const name = result.name;
        console.log(name);
        t_name.textContent=name;
        
        //Overview
        const text = document.querySelector(".summary");
        const s = d_list.sum;
        console.log(s);
        text.textContent=s;

        //Amenities
        const amenities = d_list.ameneties;
        const list_a = document.querySelector(".A_list");
        while (list_a.firstChild) {
            list_a.removeChild(list_a.firstChild);
            }
        for(const x in amenities) {
            // a_list = x + ": "+amenities[x];
            a_list = x;
            // console.log(x);
            // console.log(d_list.ameneties[x]); 
            console.log(a_list);
            const row_a = document.createElement("li");
            const text_a = document.createTextNode(a_list);
            row_a.appendChild(text_a);
            list_a.appendChild(row_a);
            console.log(row_a);
        }
        // console.log(amenities)
        
       
        //Floor Plan
        const photo = document.querySelector(".photo");
        photo.src = result.data.floor_plan;


        //Room Type number 
        const type_no = d_list.room_t_no;
        console.log("Room_type: "+ type_no);


        //Room count Extraction and Extracting Links
        const room_links = [];
        let k = 0;
        const rooms = d_list.room;
        const list_r = document.querySelector(".B_list");
        while (list_r.firstChild) {
            list_r.removeChild(list_r.firstChild);
        }
        for (const x in rooms) {
            row_roo = x+" ";
            console.log(x);
            for (const y in rooms[x]) {
                if(rooms[x][y].link != "") {    
                    room_links[k] = rooms[x][y].link;
                    row_room = row_roo+ y +": "+rooms[x][y].count;
                    k += 1;
                }
                console.log(row_room);
                const row_r = document.createElement("li");
                const text_r = document.createTextNode(row_room);
                row_r.appendChild(text_r);
                list_r.appendChild(row_r);
                console.log(row_r);
                row_room = "";
            }
            // console.log(row_room);
            // const row_r = document.createElement("li");
            // const text_r = document.createTextNode(row_room);
            // row_r.appendChild(text_r);
            // list_r.appendChild(row_r);
            // console.log(row_r);
            // row_room = "";
        }

         //Mess Options
         const mess = d_list.mess;
         const list_m = document.querySelector(".M_list");
         while (list_m.firstChild) {
             list_m.removeChild(list_m.firstChild);
        }
         for(const x in mess) {
             m_list = x + ": "+mess[x];
             console.log(m_list);
             const row_m = document.createElement("li");
             const text_m = document.createTextNode(m_list);
             row_m.appendChild(text_m);
             list_m.appendChild(row_m);
             console.log(row_m);
         }

        console.log(room_links);
        const room_pic_list = document.querySelector(".carousel");
        while (room_pic_list.firstChild) {
            room_pic_list.removeChild(room_pic_list.firstChild);
        }
        for (const x in room_links) {
            const room = document.createElement("div");
            room.setAttribute('class', 'carousel-slide');
            console.log(room);
            const room_pic = document.createElement("img");
            room_pic.setAttribute('class', 'slide');
            // room_pic.src = "./Pictures/M-Block.jpg"; 
            room_pic.src = room_links[x];
            room.appendChild(room_pic); // Append the img element to the div element
            room_pic_list.appendChild(room); // Append the div element to the carousel container
        }

        // console.log("hello");

        let slides = document.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        
        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        window.changeSlide = function(n) {
            showSlide(currentSlide + n);
        }
        showSlide(currentSlide);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    
}

let current = -1;
show(0)

document.addEventListener('DOMContentLoaded', function() {
    // let slides = document.querySelectorAll('.carousel-slide');
    // let currentSlide = 0;
    
    // function showSlide(n) {
    //     slides[currentSlide].classList.remove('active');
    //     currentSlide = (n + 7) % 7;
    //     slides[currentSlide].classList.add('active');
    // }
    // window.changeSlide = function(n) {
    //     showSlide(currentSlide + n);
    // }
    // showSlide(currentSlide);
});












// if ("geolocation" in navigator) {
//     console.log("geolocation available");
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const lat = position.coords.latitude;
//       const lon = position.coords.longitude;
//       // console.log(position);

//       const data = { lat, lon };
//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       };
//       const response = await fetch("/DataReceive", options)
//       const data1 = await response.json();
//       console.log(data1);
//     });
// } else {
//     console.log("geolocation not available");
// }


// function show(data1) {
//     const data01 = {block: data1, photo: 1}
//     sendDataToServer(data01); // Call sendDataToServer with the received data
// }

// // Define the function to send data to the server
// function sendDataToServer(data) {
//     fetch('/hostelData', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         console.log('Data sent successfully');
//     })
//     .catch(error => {
//         console.error('Error sending data:', error);
//     });
// }