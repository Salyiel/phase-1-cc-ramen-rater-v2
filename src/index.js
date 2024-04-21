const baseURL = 'http://localhost:3000';

// Callbacks
const handleClick = (ramen) => {
    // Populate details in ramen-detail container
    const detailImage = document.querySelector('#ramen-detail .detail-image');
    const nameElement = document.querySelector('#ramen-detail .name');
    const restaurantElement = document.querySelector('#ramen-detail .restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    nameElement.textContent = ramen.name;
    restaurantElement.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating; // Assuming each ramen object has a 'rating' property
    commentDisplay.textContent = ramen.comment; // Assuming each ramen object has a 'comment' property
  
    // Show ramen-detail container
    const ramenDetailContainer = document.getElementById('ramen-detail');
    ramenDetailContainer.style.display = 'block';
  };
  

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen'); 

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const requestData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${baseURL}/ramens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ramen');
      }

      // Refresh ramen menu after submitting
      await displayRamens();
    } catch (error) {
      console.error('Error submitting ramen:', error);
    }
  });
};

const displayRamens = async() => {
  try {
    const response = await fetch(`${baseURL}/ramens`);
    const ramens = await response.json();

    const ramenMenuDiv = document.getElementById('ramen-menu');
    
    // Clear existing content
    ramenMenuDiv.innerHTML = '';

    ramens.forEach(ramen => {
      const imgElement = document.createElement('img');
      imgElement.src = ramen.image;
      imgElement.alt = ramen.name;

      imgElement.addEventListener('click', () => handleClick(ramen));

      ramenMenuDiv.appendChild(imgElement);
    });
  } catch (error) {
    console.error('Error fetching ramens:', error);
  }
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
