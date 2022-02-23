document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    
        //clear data
        //console.log(searchText);
        searchField.value = '';
        document.getElementById('error-message').style.display = 'none';
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        //console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.meals))
        .catch(error = displayError(error));
     
}

const displayError = error =>{
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = meals => {
    //console.log(meals)
    const searchReasult = document.getElementById('searchResult');
    searchReasult.innerHTML = '';


    meals.forEach(meal => {
        //console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strTags}</p>
            </div>
          `
        searchReasult.appendChild(div);
    })

    
}

const loadMealDetail = async mealId => {
    //console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    const res = await fetch(url);
    const data = await res.json();
    displayMealdetail(data.meals[0]);
    /*
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealdetail(data.meals[0]))*/
}

const displayMealdetail = meal => {
    console.log(meal);
    const loadMealDetails = document.getElementById('meal-details');
    loadMealDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,100)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">See How Chef Doing It</a>
        </div>
    `;
    loadMealDetails.appendChild(div);
}