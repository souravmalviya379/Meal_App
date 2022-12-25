let favouritesList = [];
let search = document.getElementById('search-meal');

async function fetchMealsWithName(url, value) {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
        // console.log(xhrRequest.response);
        let meals = JSON.parse(xhrRequest.response).meals;

        for (let meal of meals) {
            let meal_item = document.createElement('div');
            meal_item.innerHTML = `
                <div class='meal-item'>
                    <img src="${meal.strMealThumb}" alt="" class='meal-image'>
                    <div>
                        <span class='meal-name'> ${meal.strMeal} </span>
                        <i class="fa-solid fa-heart heart" id='${meal.idMeal}'></i>
                    </div>
                    <button id='${meal.idMeal}'> More Details </button>
                </div>
            `
            document.getElementById('meals').append(meal_item);
        }
    };
    xhrRequest.open('get', url + value, true);
    xhrRequest.send();
}


search.addEventListener('keyup', (e) => {
    if (e.key == ' ' || e.key == 'Tab') {
        //if this key's pressed don't search
        return;
    }
    document.getElementById('meals').innerHTML = "";
    let value = e.target.value;
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    fetchMealsWithName(url, value);
})

//adding event listener to favorites button
document.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
        localStorage.setItem('value', e.target.id);
        location.href = 'meal-details.html';
        return;
    }

    if (e.target.className == 'fa-solid fa-heart heart') {
        e.target.classList.add('favourite');
        alert('Added to favorites');
        favouritesList.push(e.target.id);
        console.log(favouritesList);
        return;
    }

    if (e.target.className == 'fa-solid fa-heart heart favourite') {
        e.target.classList.remove('favourite');
        alert('Removed from favorites');
        let newList = favouritesList.filter((item) => {
            return item != e.target.id;
        })
        favouritesList = newList;
        //also removing item from local storage
        localStorage.setItem('favouritesList', favouritesList);
        return;
    }
})

document.getElementById('favourites').addEventListener('click', (e)=>{
    localStorage.setItem('favouritesList', favouritesList);
})

