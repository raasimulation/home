const character = document.getElementById('character');
    const wordContainer = document.getElementById('word-container');
    const questionInput = document.getElementById('question-input');
    const words = ['climb', 'hike', 'explore', 'adventure']; // Add more words as needed

    let currentWordIndex = 0;
    let currentPosition = 0;

    // Display the initial word
    displayNextWord();

    // Function to move the character up the mountain
    function climbMountain() {
        currentPosition -= 50; // Adjust the step size based on your preference
        character.style.bottom = `${currentPosition}px`;

        // Check if the character has reached the top of the mountain
        if (currentPosition <= -200) {
            // Reset position for the next word
            currentPosition = 0;
            character.style.bottom = `${currentPosition}px`;

            // Display the next word
            displayNextWord();
        }
    }

    // Function to display the next word
    function displayNextWord() {
        if (currentWordIndex < words.length) {
            wordContainer.textContent = words[currentWordIndex];
            currentWordIndex++;
        } else {
            // All words are completed
            alert('Congratulations! You reached the top of the mountain.');
            // You may reset the game or perform other actions here
        }
    }

    // Event listener for user input
    document.getElementById('question').addEventListener('keyup', function () {
        const typedWord = document.getElementById('question').value.toLowerCase();
        const currentWord = words[currentWordIndex - 1].toLowerCase();

        if (currentWord.startsWith(typedWord)) {
            climbMountain();
        }
    });