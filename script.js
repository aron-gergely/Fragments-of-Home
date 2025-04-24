$(document).ready(function() {

    setTimeout(() => {
      $('#loadingOverlay').addClass('hidden');
      setTimeout(() => $('#loadingOverlay').remove(), 500); // Fully remove after fade
    }, 1000); // Shows spinner fill for 1 second
 

    let isPopupClosed = false;  // Track if the popup has been closed
    let lastText = "";
    let lastImage = "";
    let isTyping = false; // Track if text animation is in progress
    let typingTimeout; // Typing animation function - Store the timeout reference


    const imageArray = [];
    for (let i = 1; i <= 30; i++) {
      const num = String(i).padStart(2, '0'); // "01", "02", etc.
      imageArray.push(`images/image${num}.jpg`);
    }

    const imageScroll = document.querySelector('.image-scroll');

    imageArray.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'popup-image';
      img.alt = '';
      img.loading = 'lazy';
      imageScroll.appendChild(img);
    });


    const textArray = [
        "Take everything out. Refold. Put back in.", 
        "Try everything on and see if you still love it.", 
        "This is smart!", 
        "I am ashamed of myself to admit that I have been WAAAYYYYY over thinking this my entire life.", 
        "ADHD is wild, man. Absolutely wild. It just froze me on thinking critically on this.", 
        "I can NOT figure out how and where to store… things. Things that have no obvious home.", 
        "Have you ever watched that mom on YouTube? She’s pretty inspiring and has lots of info on handling exactly what you need.", 
        "where would I look for this first?", 
        "I pull it out and wrap everything in one go.", 
        "I feel you, man. I have 4 empty drawers but keep my clothes in piles and baskets because I can't decide how to put them away.", 
        "Here's an example from my home:", 
        "I have a regift box for gifts I’ve received that I’m not interested in.", 
        "DON’T TOUCH MY PILES I KNOW EXACTLY WHERE EVERYTHING IS!!!", 
        "I have a similar struggle. I find it helps me to first focus on getting things into the appropriate room.", 
        "Sometimes it's good enough to get things bundled together and in a bag or something. At least they are bundled together.", 
        "even if you think you will remember, you won’t...", 
        "I want to open up a conversation about this. No pressure, no judgment, just a space to talk about what feels hard when it comes to our homes and the things we own.", 
        "Have you ever felt like your home isn’t quite yours anymore—not because you don’t live there, but because it doesn’t fully support who you are or who you want to become?", 
        "I'd love to understand what's been crowding your mind lately when it comes to your home", 
        "Did this happen in tiny sneaky increments?", 
        "Our homes are living entities, they inhale and stuff comes in but it rarely exhales and enough goes out...", 
        "we only need enough to NOT BE NAKED", 
        "I honestly struggle with this too, and I am a professional organizer!", 
        "Sometimes an honest friend can help with a voting day. If they love it, it stays, but if they vote it out, it's got to go!", 
        "Also - I have 2 teenage girls - one of them is disorganized and the other is just straight up lazy.", 
        "I can't have anyone over because it's too messy", 
        "What if you just legit have too much stuff you 'need'?", 
        "Going to ask the obvious question:", 
        "Ask yourself: <br>• Where does this live? <br>• When is the last time I used this? <br>• Am I actively using this? <br>• Have I used it today? This week? <br>• Who benefits from having this out?", 
        "Maybe just having less stuff will mean less to clean up.", 
        "Also for the girls... good luck.", 
        "Hide it in a closet, a room's corner, whatever.", 
        "I got one and it’s absolutely been the best thing! Not sure how it’d work for what you have, but there’s a few different sizes.", 
        "i actually have one of those... i think i need to decide what outcome i want to have, and then ask for advice if i can't find it myself.", 
        "I'm stealing this idea from you! Great idea!", 
        "Learn to say no when people offer free stuff. Tempting but not always needed.", 
        "Nice! Do you use it for bigger stuff too?", 
        "I would get serious and throw most of it out", 
        "I am also a clutter monster!", 
        "Please, just hire a professional organizer...", 
        "I don’t know the name of it but there’s this lady on YouTube that talks about organizing and decluttering. Maybe you can google and find her. Good luck!", 
        "Take a photo of each one, and put each photo in a frame. Donate all the physical items. Look at the photo whenever you want to.", 
        "Disclaimer: this is our home on a goodish day. I am sorry if I give some of you a heart attack with the photos.", 
        "box all of that up and put it in a closet for 3 months", 
        "I guess I never understood why it’s not kept in the bathroom. It would make much more sense to me.", 
        "So now I say goodbye to it, thank it for its years of service, and wish it well on its way.", 
        "It's less useful, but still, just a tiny bit too useful for the trash", 
        "For me, I don't mind digging around in a drawer (or bin) to get what I want", 
        "Figuring out where you fit on the hidden vs visual storage (x-axis) and the micro vs macro organization (y-axis) is a real game changer.", 
        "I just have to say it is uncanny how much your reflection looks like me.", 
        "Nah, just cover it with something.",
        // 2025.04.22.-
        "How many days do you usually change bedsheets?"
    ];





// Optional: simulate hover on tap
$(document).on('touchstart', '.card', function () {
    $(this).addClass('hovered');
});
$(document).on('touchend', '.card', function () {
    $(this).removeClass('hovered');
});


// Button Click Animation (Press effect)
$("button").on("mousedown", function () {
    gsap.to(this, { scale: 0.92, duration: 0.1, ease: "power1.inOut" });
});

$("button").on("mouseup mouseleave", function () {
    gsap.to(this, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" }); // Slight bounce back
});




// Disable the save button during typing
function disableSaveButton() {
    $('#saveBtn').prop('disabled', true).addClass('disabled'); // Add visual feedback (optional)
}

// Enable the save button after typing
function enableSaveButton() {
    $('#saveBtn').prop('disabled', false).removeClass('disabled');
}


function typeText(target, text) {
    clearTimeout(typingTimeout); // Stop any previous typing animation
    target.html(""); // Use `.html()` to allow line breaks
    let i = 0;
    isTyping = true; // Mark typing as active
    disableSaveButton(); // Disable the Save button while typing

    function type() {
        if (i < text.length) {
            let currentText = text.substring(0, i + 1).replace(/\n/g, "<br>"); // Replace newlines with <br>
            target.html(currentText); // Set text with line breaks
            i++;
            typingTimeout = setTimeout(type, 20); 
        } else {
            isTyping = false; // Mark typing as complete
            enableSaveButton(); // Enable the Save button when done
        }
    }

    type();
}



// Randomize and display a pair of text and image
$('#randomizeBtn').click(function() {
    let randomText, randomImage;

    do {
        randomText = textArray[Math.floor(Math.random() * textArray.length)];
    } while (randomText === lastText);
    lastText = randomText;

    do {
        randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    } while (randomImage === lastImage);
    lastImage = randomImage;

    // Create a new pair (with invisible text and image initially)
    const newPair = $(`
        <div class="pair" style="opacity: 0;">
            <img src="${randomImage}" alt="Random Image" style="opacity: 0;">
            <p></p> <!-- Start with empty text -->
        </div>
    `);

    // First fade out old elements and scale down the image
    const oldPair = $('#pairContainer .pair');  // Get the old pair

    gsap.to(oldPair.find("img"), { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.out" });
    gsap.to(oldPair.find("p"), { opacity: 0, duration: 0.3 });

    // Wait for the old pair to fade out before updating the content
    gsap.to(oldPair, { opacity: 0, duration: 0.3, ease: "power2.out", onComplete: function() {
        // Now, add the new pair to the container
        $('#pairContainer').html(newPair);

        const textElement = newPair.find("p");
        const imgElement = newPair.find("img");

        // Fade in the new pair (text and image together)
        gsap.to(newPair, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });

        // Wait for the image to load and fade it in with scaling
        imgElement.on("load", function() {
            gsap.to(imgElement, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        }).each(function() {
            if (this.complete) $(this).trigger("load");
        });

        // Start text animation
        gsap.to(textElement, { opacity: 1, duration: 0.2 });
        typeText(textElement, randomText);
    }});
});


// Refresh only the image (without triggering text animation)
$('#newImageBtn').click(function() {
    if ($('#pairContainer img').length === 0) return;

    let randomImage;
    do {
        randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
    } while (randomImage === lastImage);
    lastImage = randomImage;

    const imgElement = $('#pairContainer img');
if (imgElement.length) {
    gsap.to(imgElement, { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.out", onComplete: function() {
        imgElement.attr('src', randomImage).on('load', function() {
            gsap.to(imgElement, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        });
    }});
}

    gsap.to(imgElement, { opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.out", onComplete: function() {
        imgElement.attr('src', randomImage).on('load', function() {
            gsap.to(imgElement, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        });
    }});
});


// Refresh only the text (with animation)
$('#newTextBtn').click(function() {
    let randomText;
    do {
        randomText = textArray[Math.floor(Math.random() * textArray.length)];
    } while (randomText === lastText);
    lastText = randomText;

    const textElement = $('#pairContainer p');

    gsap.to(textElement, { opacity: 0, duration: 0.2, onComplete: function() {
        clearTimeout(typingTimeout);
        textElement.text("");
        gsap.to(textElement, { opacity: 1, duration: 0.2 });
        typeText(textElement, randomText);
    }});
}); 


// Save the selected pair
$('#saveBtn').click(function() {
    const imgSrc = $('#pairContainer img').attr('src');
    const text = $('#pairContainer p').html(); // Use .html() instead of .text()


    if (!imgSrc || !text) return;

    // Create the saved card with a delete button
    const savedCard = $(`
        <div class="card draggable ui-widget-content">
            <img src="${imgSrc}" alt="Saved Image">
            <p>${text}</p>
            <button class="deleteBtn"><span class="deleteIcon">×</span></button> <!-- Red circle with X -->
        </div>
    `);

    // Append the saved card to the saved pairs container
    $('#savedPairs').append(savedCard);

    // Animate the saved card (pop effect)
    gsap.from(savedCard, { opacity: 0, scale: 0.8, duration: 0.4, ease: "back.out(1.5)" });

    // Fly animation to saved area
    gsap.fromTo(savedCard, 
        { x: -50, y: -50, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    // Apply a pulse animation on save
    savedCard.addClass("pulse");
    setTimeout(() => savedCard.removeClass("pulse"), 600);


// Initialize jQuery UI draggable
savedCard.draggable({
    containment: '#savedPairs',  // Restrict dragging within the #savedPairs container
    cursor: "move",
    snap: ".card",
    snapMode: "both",
    snapTolerance: 20,
});





    // Delete the card when the delete button is clicked
    savedCard.find(".deleteBtn").click(function() {
        // Animate the card disappearing
        gsap.to(savedCard, { opacity: 0, scale: 0.5, duration: 0.2, ease: "power2.out", onComplete: function() {
            savedCard.remove(); // Remove the card after the animation
        }});
    });

    // Ensure clicked card is always on top
    $(document).on("mousedown", ".card", function () {
        $(".card").css("z-index", ""); 
        $(this).css("z-index", "1000"); 
        });
    });



    // Card shadow during drag
    $(document).on("mousedown", ".card", function () {
        gsap.to(this, { 
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", 
            duration: 0.2, 
            ease: "power2.out" 
        });
    });

    // Ensure the shadow disappears only after dragging stops
    $(document).on("mouseup", function () {
        gsap.to(".card", { 
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)", 
            duration: 0.3, 
            ease: "power2.out" 
        });
    });



let isPopupVisible = true; // Show on page load
let isFirstLoad = true;  // Flag to track if it's the first load of the page

$(document).ready(function () {$(document).ready(function () {
    let isPopupVisible = true; // Show on page load
    let isFirstLoad = true;  // Flag to track if it's the first load of the page

    console.log("Page loaded, showing popup...");
    showPopup(); // Assuming this function exists elsewhere

    // Initial text of the button
    $('#menuBtn').text('Start');

    // Menu button click event
    $('#menuBtn').on('click', function () {
        console.log("Menu button clicked");
        
        // If it's the first click, trigger the animation
        if (isFirstLoad) {
            $('#menuBtn').addClass('shrink'); // Trigger the shrink animation

            // Delay text change until the width transition is finished
            setTimeout(() => {
                $('#menuBtn').text('?'); // Change the button text
            }, 400); // Match the transition time (0.4s)

            // Show or hide popup based on visibility
            if (isPopupVisible) {
                closePopup(); // Close popup if visible
                isPopupVisible = false; // Update visibility state
            } else {
                showPopup(); // Show popup if not visible
                isPopupVisible = true; // Update visibility state
            }

            isFirstLoad = false; // No need to shrink again
        } else {
            // Toggle the popup visibility on subsequent clicks
            if (isPopupVisible) {
                closePopup();
                $('#menuBtn').text('?'); // Change text when popup closes
            } else {
                showPopup();
                $('#menuBtn').text('X'); // Change text when popup opens
            }
            isPopupVisible = !isPopupVisible; // Toggle popup visibility
        }
    });
});


    console.log("Page loaded, showing popup...");
    showPopup(); // Assuming this function exists elsewhere

    // Initial text of the button
    $('#menuBtn').text('Start');

    // Menu button click event
    $('#menuBtn').on('click', function () {
        console.log("Menu button clicked");
        
        // If it's the first click, trigger the animation
        if (isFirstLoad) {
            $('#menuBtn').addClass('shrink'); // Trigger the shrink animation

            // Delay text change until the width transition is finished
            setTimeout(() => {
                $('#menuBtn').text('?'); // Change the button text
            }, 400); // Match the transition time (0.4s)

            // Show or hide popup based on visibility
            if (isPopupVisible) {
                closePopup(); // Close popup if visible
                isPopupVisible = false; // Update visibility state
            } else {
                showPopup(); // Show popup if not visible
                isPopupVisible = true; // Update visibility state
            }

            isFirstLoad = false; // No need to shrink again
        } else {
            // Toggle the popup visibility on subsequent clicks
            if (isPopupVisible) {
                closePopup();
                $('#menuBtn').text('?'); // Change text when popup closes
            } else {
                showPopup();
                $('#menuBtn').text('X'); // Change text when popup opens
            }
            isPopupVisible = !isPopupVisible; // Toggle popup visibility
        }
    });
});




function showPopup() {
    console.log("Showing popup...");

    // Shuffle popup images before showing
    shufflePopupImages();

    $('body').css('overflow', 'hidden');

    // Apply the backdrop filter (blur) immediately to the background
    $('#popup').css('backdrop-filter', 'blur(5px)');

    if (isFirstLoad) {
        // On the first load, show the popup instantly without fade-in
        $('#popup').show();
        isPopupVisible = true;
        isFirstLoad = false;  // Set the flag to false after the first load

        // Fade in images within the popup after the popup is visible
        $('.popup-image').each(function(index) {
            $(this).addClass('visible');
        });
    } else {
        // For subsequent openings, apply the fade-in
        setTimeout(() => {
            $('#popup').fadeIn(500, function() {
                isPopupVisible = true;
                console.log("Popup is visible:", isPopupVisible);

                // Fade in images within the popup after the popup is visible
                $('.popup-image').each(function(index) {
                    $(this).delay(index * 100).queue(function(next) {
                        $(this).addClass('visible');
                        next();
                    });
                });
            });
        }, 0);
    }
}


function closePopup() {
    console.log("Closing popup...");
    $('#popup').fadeOut();
    $('#popup').css('backdrop-filter', 'blur(0px)');
    $('body').css('overflow', 'auto');
    isPopupVisible = false;
    console.log("Popup is closed:", isPopupVisible);

    if (!isPopupClosed) {
        isPopupClosed = true;  // Set the flag to true on first close
        $('#randomizeBtn').trigger("click");  // Trigger the randomization after closing the popup
    }
}
  
});



// POPUP IMAGE ATOSCROLL

$(document).ready(function() {
    const scrollContainer = $('.image-scroll'); // The container that will scroll
    const defaultSpeed = 0.5; // Default speed of scroll
    const minSpeed = 0.05; // Slowest scroll speed before stopping
    const maxSpeed = 0.5; // Maximum speed of scroll
    let currentSpeed = defaultSpeed; // Start with the default speed
    let scrollTop = scrollContainer.scrollTop(); // Initial scroll position
    let isHovered = false; // Track if an image is being hovered over
    let scrollInterval; // Variable to hold the interval ID

    // Smooth scrolling function
    function autoScroll() {
        const scrollHeight = scrollContainer[0].scrollHeight;
        const containerHeight = scrollContainer.height();

        // If we've reached the bottom of the scroll container, reset to the top
        if (scrollTop + containerHeight >= scrollHeight) {
            scrollTop = 0;
        } else {
            scrollTop += currentSpeed;
        }

        // Scroll to the new scrollTop position
        scrollContainer.scrollTop(scrollTop);

        // Request the next animation frame for smoothness
        if (scrollInterval) {
            requestAnimationFrame(autoScroll);
        }
    }

    function startAutoScroll() {
        // Start the auto-scrolling using requestAnimationFrame for smoothness
        if (!scrollInterval) {
            scrollInterval = requestAnimationFrame(autoScroll);
        }
    }

    function stopAutoScroll() {
        // Gradually decrease the speed when hovering
        const decelerationInterval = setInterval(() => {
            if (currentSpeed > minSpeed) {
                currentSpeed -= 0.02; // Gradually decrease the speed (slower deceleration)
            } else {
                currentSpeed = minSpeed; // Ensure we don’t go below the minimum speed
                clearInterval(decelerationInterval); // Stop the deceleration process
                // Stop the auto-scroll (no more animation frames)
                cancelAnimationFrame(scrollInterval);
                scrollInterval = null;
            }
        }, 16); // Keep the interval for smooth deceleration (16ms = ~60fps)
    }

    function resumeAutoScroll() {
        // Gradually increase the speed back to the default speed when hover ends
        const accelerationInterval = setInterval(() => {
            if (currentSpeed < maxSpeed) {
                currentSpeed += 0.02; // Gradually increase the speed (slower acceleration)
            } else {
                currentSpeed = maxSpeed; // Ensure we don’t exceed the maximum speed
                clearInterval(accelerationInterval); // Stop the acceleration process
            }
        }, 16); // Keep the interval for smooth acceleration (16ms = ~60fps)
    }

    // Start the auto-scrolling when the page loads
    startAutoScroll();

    // Stop scrolling when hovering over an image
    scrollContainer.on('mouseenter', 'img', function() {
        stopAutoScroll();
    });

    // Resume scrolling when mouse leaves the scroll container
    scrollContainer.on('mouseleave', function() {
        resumeAutoScroll();
        startAutoScroll(); // Restart the auto-scrolling after accelerating
    });
});



// POPUP IMAGES RANDOM ORDER

function shufflePopupImages() {
    const container = $('.image-scroll');
    const images = container.children('.popup-image');

    // Convert to array and shuffle
    const shuffled = images.toArray().sort(() => Math.random() - 0.5);

    // Re-append shuffled images
    container.append(shuffled);
}




// Scrolling active
const rightSide = document.querySelector('.right-side');
let scrollTimeout;

rightSide.addEventListener('scroll', () => {
  rightSide.classList.add('scrolling');

  // Clear the previous timeout
  clearTimeout(scrollTimeout);

  // Remove the class after 1s of no scroll
  scrollTimeout = setTimeout(() => {
    rightSide.classList.remove('scrolling');
  }, 1000);
});



