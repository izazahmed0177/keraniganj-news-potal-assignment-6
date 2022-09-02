const loadAllCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const response = await fetch(url);
    const data = await response.json();
    // return data;
    // setAllCategory(data);
    // setAllCategory(data.data);
    setAllCategory(data.data.news_category);


    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => console.log(data.data))
}



const setAllCategory = async (categorys) => {

    // console.log(categorys)

    const categorysContainer = document.getElementById('categorys-container')

    // categorys.forEach((category) => {

    //     console.log(category)
    //     console.log(category.category_name)

    //     const categoryUl = document.createElement('div');
    //     categoryUl.classList.add('nav justify-content-center')

    //     categoryUl.innerHTML = `
    //     <li class="nav-item">
    //          <a class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
    //     </li>

    //     `
    //     // categorysContainer.appendChild(categoryUl)
    // });


    for (let category of categorys) {
        console.log(category.category_id)

        const categoryDiv = document.createElement('div');


        categoryDiv.innerHTML = `
            <li class="nav-item" >
                 <a class="nav-link active" onclick="loadCategoryDetails('${category.category_id}')" aria-current="page" href="#">${category.category_name}</a>
            </li>
    
            `
        categorysContainer.appendChild(categoryDiv)
    }



}



const loadCategoryDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/'${id}'`;

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    // console.log(data.data)
    // displayPhoneDetails(data.data)
    displayCategoryDetails(data)
    displayCategoryDetails(data.data)
}

const displayCategoryDetails = category => {
    console.log(category);

}

// loadCategoryDetails();
loadAllCategory();