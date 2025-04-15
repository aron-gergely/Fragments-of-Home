$(document).ready(function() {


    const imageArray = [
        /*
        "images/image01.png",
        "images/image02.png",
        "images/image03.png",
        "images/image04.png",
        "images/image05.png",
        "images/image06.png",
        "images/image07.png",
        "images/image08.png",
        "images/image09.png",
        "images/image10.png",
        "images/image11.png",
        "images/image12.png"
        */
        "images/image13.png",
        "images/image14.png",
        "images/image15.png",
        "images/image16.png",
        "images/image17.png",
        // "images/image18.png",
        "images/image19.png",
        "images/image20.png"  
    ];

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
        "Nah, just cover it with something."
    ];


/*
// Button Hover Animation
$("button").hover(
    function () {
        gsap.to(this, { 
            backgroundColor: "#e50000", // Change to desired hover color
            color: "#fff", // Change text color for contrast
            // boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)", // Soft glow effect
            duration: 0.3,
            ease: "power2.out" 
        });
    },
    function () {
        gsap.to(this, { 
            backgroundColor: "", // Revert to original
            color: "", 
            boxShadow: "0px 0px 0px rgba(0,0,0,0)", // Remove glow
            duration: 0.3,
            ease: "power2.out" 
        });
    }
);
*/

// Button Click Animation (Press effect)
$("button").on("mousedown", function () {
    gsap.to(this, { scale: 0.92, duration: 0.1, ease: "power1.inOut" });
});

$("button").on("mouseup mouseleave", function () {
    gsap.to(this, { scale: 1, duration: 0.2, ease: "elastic.out(1, 0.5)" }); // Slight bounce back
});



let lastText = "";
let lastImage = "";
let isTyping = false; // Track if text animation is in progress
let typingTimeout; // Typing animation function - Store the timeout reference



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


    // Automatically generate a random pair when the page loads
    $(document).ready(function() {
        $('#randomizeBtn').trigger("click");
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


    // Open popup when 'menu' button is clicked
    $('#menuBtn').click(function() {
        $('#popup').fadeIn(); // Show the popup


    // Close popup when 'popup-close' button is clicked
    $('#popupCloseBtn').click(function() {
        $('#popup').fadeOut(); // Hide the popup
    });

    // Close popup if clicked outside of the popup content
    $(document).click(function(event) {
        if (!$(event.target).closest('.popup-content').length && !$(event.target).is('#menuBtn')) {
            $('#popup').fadeOut(); // Hide the popup
        }
    });
});
    
// Show the popup when opeining page
/* showPopup(); */
    
    // Show the popup and trigger blur animation
function showPopup() {
    // Disable scrolling on the body
    $('body').css('overflow', 'hidden');
    
    // Start applying the blur immediately
    $('#popup').css('backdrop-filter', 'blur(5px)');
    
    // Fade in the popup content after a slight delay for the blur to take effect
    setTimeout(function() {
        $('#popup').fadeIn(); // or use .show() for immediate visibility
    }, 50); // You can adjust the delay here for how soon the blur starts
}

// Close the popup and reset blur
function closePopup() {
    // Hide the popup
    $('#popup').fadeOut(); // or use .hide() to make it disappear
    // Reset the blur effect immediately
    $('#popup').css('backdrop-filter', 'blur(0px)');
    
    // Re-enable scrolling on the body
    $('body').css('overflow', 'auto');
}

    // Open the popup when the menu button is clicked
    $('#menuBtn').click(function() {
        showPopup();
    });

    // Close the popup when the close button is clicked
    $('#popupCloseBtn').click(function() {
        closePopup();
    });
    
});



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



